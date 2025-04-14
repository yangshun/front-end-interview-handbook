import { useCallback, useMemo, useState } from 'react';

export default function useStateWithReset<T>(
  initialStateOrInitializer?: T | (() => T),
) {
  const initialState: T = useMemo(() => {
    if (
      typeof initialStateOrInitializer === 'function' &&
      initialStateOrInitializer.length === 0
    )
      // @ts-expect-error https://github.com/microsoft/TypeScript/issues/37663
      return initialStateOrInitializer();

    return initialStateOrInitializer;
  }, []);

  const [state, setState] = useState(initialState);

  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState, reset] as const;
}
