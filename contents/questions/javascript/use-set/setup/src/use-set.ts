import { useCallback, useState } from 'react';

export interface UseSetReturn<T> {
  set: Readonly<Set<T>>;
  add: (key: T) => void;
  remove: (key: T) => void;
  toggle: (key: T) => void;
  reset: () => void;
  clear: () => void;
}

export default function useSet<T>(
  initialState = new Set<T>(),
): UseSetReturn<T> {
  const [set, setSet] = useState(initialState);

  const add: UseSetReturn<T>['add'] = useCallback(
    (item: T) => setSet((prev) => new Set([...Array.from(prev), item])),
    [],
  );

  const remove: UseSetReturn<T>['remove'] = useCallback(
    (item: T) =>
      setSet((prev) => new Set(Array.from(prev).filter((i) => i !== item))),
    [],
  );

  const toggle: UseSetReturn<T>['toggle'] = useCallback(
    (item: T) =>
      setSet((prev) =>
        prev.has(item)
          ? new Set(Array.from(prev).filter((i) => i !== item))
          : new Set([...Array.from(prev), item]),
      ),
    [],
  );

  const reset: UseSetReturn<T>['reset'] = useCallback(
    () => setSet(initialState),
    [initialState],
  );

  const clear: UseSetReturn<T>['clear'] = useCallback(
    () => setSet(new Set()),
    [],
  );

  return { set, add, remove, toggle, reset, clear };
}
