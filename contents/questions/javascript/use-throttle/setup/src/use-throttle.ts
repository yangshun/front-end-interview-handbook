import { useState, useRef, useEffect } from 'react';

export default function useThrottle<T>(value: T, interval = 500) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef<number>();

  useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}
