import { useState } from 'react';

export default function usePrevious<T>(state: T) {
  const [current, setCurrent] = useState(state);
  const [previous, setPrevious] = useState<T>();

  if (current !== state) {
    setPrevious(current);
    setCurrent(state);
  }

  return previous;
}
