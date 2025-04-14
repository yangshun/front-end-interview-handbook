import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

interface StateMediator<T = unknown> {
  (newState: T): T;
  (newState: T, dispatch: Dispatch<SetStateAction<T>>): void;
}

export default function useMediatedState<T = unknown>(
  mediator: StateMediator<T>,
  initialState?: T,
): [T, Dispatch<SetStateAction<T>>] {
  const mediatorFn = useRef(mediator);

  const [state, setMediatedState] = useState<T>(initialState!);

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (newStateOrUpdaterFunction) => {
      const newState =
        newStateOrUpdaterFunction instanceof Function
          ? newStateOrUpdaterFunction(state)
          : newStateOrUpdaterFunction;

      const mediator = mediatorFn.current;

      if (mediator.length === 2) {
        mediator(newState, setMediatedState);
      } else {
        setMediatedState(mediator(newState));
      }
    },
    [state],
  );

  return [state, setState];
}
