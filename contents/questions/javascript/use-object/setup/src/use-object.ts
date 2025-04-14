import { useCallback, useState } from 'react';

function isPlainObject(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

type UseObjectUpdater<T extends Record<string | number | symbol, any>> = (
  partialOrUpdaterFunction: Partial<T> | ((prev: T) => Partial<T>),
) => void;

export default function useObject<
  T extends Record<string | number | symbol, any>,
>(initialValue: T): [T, UseObjectUpdater<T>] {
  const [state, setState] = useState(initialValue);

  const merge: UseObjectUpdater<T> = useCallback((partialOrUpdaterFunction) => {
    if (partialOrUpdaterFunction instanceof Function)
      return setState((previousState) => {
        const newState = partialOrUpdaterFunction(previousState);
        if (!isPlainObject(newState)) {
          throw new Error('Invalid new state');
        }

        return { ...previousState, ...newState };
      });

    if (!isPlainObject(partialOrUpdaterFunction)) {
      throw new Error('Invalid new state');
    }

    setState((previousState) => ({
      ...previousState,
      ...partialOrUpdaterFunction,
    }));
  }, []);

  return [state, merge];
}
