import React, { createContext, useCallback, useContext, useState } from 'react';

import type { ToastMessage } from '~/components/ui/Toast/Toast';
import Toast from '~/components/ui/Toast/Toast';

type ShowToast = (message: ToastMessage) => Readonly<{
  closeToast: () => void;
}>;

type Context = Readonly<{
  showToast: ShowToast;
}>;

export const ToastContext = createContext<Context>({
  showToast: (_: ToastMessage) => ({ closeToast: () => {} }),
});

const getID = (() => {
  let id = 0;

  return () => {
    return id++;
  };
})();

type ToastData = ToastMessage & {
  id: number;
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastsProvider({ children }: Props) {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);

  const showToast = useCallback((toast: ToastMessage) => {
    const newToastID = getID();

    setToasts((oldToasts) => [{ ...toast, id: newToastID }, ...oldToasts]);

    function closeThisToast() {
      closeToast(newToastID);
    }

    return {
      closeToast: closeThisToast,
    };
  }, []);

  function closeToast(id: number) {
    setToasts((oldToasts) => {
      const newToasts = oldToasts.filter((toast) => toast.id !== id);

      return newToasts;
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-toast flex items-end px-4 py-6 sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-start">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {toasts.map(({ id, onClose, ...toast }) => (
            <Toast
              key={id}
              {...toast}
              onClose={() => {
                onClose?.();
                closeToast(id);
              }}
              onExpire={() => {
                closeToast(id);
              }}
            />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
