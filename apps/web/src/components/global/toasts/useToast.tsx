// Inspired by react-hot-toast library
import { useCallback, useEffect, useState } from 'react';

import type {
  CustomToastProps,
  DefaultToastProps,
  ToastProps,
} from '~/components/ui/Toast/Toast';

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 10000;

type ToasterToast = Readonly<{
  id: string;
}> &
  ToastProps;
type DefaultToasterToast = DefaultToastProps &
  Readonly<{
    id: string;
  }>;
type CustomToasterToast = CustomToastProps &
  Readonly<{
    id: string;
  }>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;

  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      toast: ToasterToast;
      type: ActionType['ADD_TOAST'];
    }
  | {
      toast: ToasterToast;
      type: ActionType['UPDATE_TOAST'];
    }
  | {
      toastId?: ToasterToast['id'];
      type: ActionType['DISMISS_TOAST'];
    }
  | {
      toastId?: ToasterToast['id'];
      type: ActionType['REMOVE_TOAST'];
    };

type State = {
  toasts: Array<ToasterToast>;
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      toastId,
      type: 'REMOVE_TOAST',
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toastItem) => {
          addToRemoveQueue(toastItem.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type DefaultToast = Omit<DefaultToasterToast, 'id'>;
type CustomToast = Omit<CustomToasterToast, 'id'>;
type Toast = CustomToast | DefaultToast;

function showToast({ ...props }: Toast) {
  const id = genId();

  const update = (toastItem: ToasterToast) =>
    dispatch({
      toast: { ...toastItem, id },
      type: 'UPDATE_TOAST',
    });
  const closeToast = () => dispatch({ toastId: id, type: 'DISMISS_TOAST' });

  dispatch({
    toast: {
      ...props,
      id,
      onOpenChange: (open: boolean) => {
        if (!open) {
          closeToast();
        }
      },
      open: true,
    },
    type: 'ADD_TOAST',
  });

  return {
    closeToast,
    id,
    update,
  };
}

function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const dismissToast = useCallback(
    (toastId?: string) => dispatch({ toastId, type: 'DISMISS_TOAST' }),
    [],
  );

  return {
    ...state,
    dismissToast,
    showToast,
  };
}

export { useToast };
