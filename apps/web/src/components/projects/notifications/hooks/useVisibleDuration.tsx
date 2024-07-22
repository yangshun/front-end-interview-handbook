import type { MutableRefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

type UseVisibleDuration = {
  elementRef: MutableRefObject<HTMLDivElement | null>;
  visibleDuration: number;
};

export default function useVisibleDuration(): UseVisibleDuration {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleDuration, setVisibleDuration] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setVisibleDuration((prevDuration) => prevDuration + 1);
      }, 2000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isVisible]);

  return { elementRef, visibleDuration };
}
