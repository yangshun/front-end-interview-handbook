import { EffectCallback, useEffect, useRef } from 'react';

export default function useEffectOnce(effect: EffectCallback) {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    if (ref.current) {
      return;
    }

    ref.current = true;
    return effect();
  }, []);
}
