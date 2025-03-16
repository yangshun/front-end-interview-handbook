import { useCallback, useState } from 'react';

export default function useCycle<T>(...args: T[]) {
  const [index, setIndex] = useState(0);

  const cycle = useCallback(() => {
    setIndex((index) => (index + 1) % args.length);
  }, []);

  return [args[index], cycle] as const;
}
