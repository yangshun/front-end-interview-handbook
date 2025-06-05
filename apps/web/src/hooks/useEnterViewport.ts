import { useEffect, useRef } from 'react';

export function useEnterViewport(callback: (isInView: boolean) => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (element == null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
}
