import { useCallback, useMemo, useState } from 'react';

export default function useStateWithReset(initialStateOrInitializer) {
  const initialState = useMemo(() => {
    if (
      typeof initialStateOrInitializer === 'function' &&
      initialStateOrInitializer.length === 0
    )
      return initialStateOrInitializer();

    return initialStateOrInitializer;
  }, []);

  const [state, setState] = useState(initialState);

  const reset = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  return [state, setState, reset];
}
