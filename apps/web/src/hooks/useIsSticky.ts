import type { RefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';

export default function useIsSticky(
  ref: RefObject<Element>,
  observerSettings = { threshold: [1] },
) {
  const [isStuck, setIsStuck] = useState(false);
  const [isScrollZero, setIsScrollZero] = useState(true);

  const isSticky = useMemo(() => {
    return isStuck || isScrollZero;
  }, [isStuck, isScrollZero]);

  // Mount
  useEffect(() => {
    const element = ref.current;

    setIsScrollZero(window.scrollY === 0);

    if (element == null) {
      return;
    }

    const observer = new IntersectionObserver(([e]) => {
      return setIsStuck(e.intersectionRatio < 1);
    }, observerSettings);

    const scrollListener = () => {
      if (window.scrollY > 0) {
        setIsScrollZero(false);
      } else {
        setIsScrollZero(true);
      }
    };

    window.addEventListener('scroll', scrollListener);

    observer.observe(element);

    // Unmount
    return () => {
      observer.unobserve(element);
      window.removeEventListener('scroll', scrollListener);
    };
  }, [observerSettings, ref]);

  return { isSticky };
}
