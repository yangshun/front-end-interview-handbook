import { useState, useRef, useCallback, RefCallback } from 'react';

export default function useHover<T extends Element>(): [
  RefCallback<T>,
  boolean,
] {
  const [hovering, setHovering] = useState(false);
  const previous = useRef<T | null>();

  const handleMouseEnter = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  const customRef: RefCallback<T> = useCallback(
    (node) => {
      if (previous.current?.nodeType === Node.ELEMENT_NODE) {
        previous.current.removeEventListener('mouseenter', handleMouseEnter);
        previous.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }

      previous.current = node;
    },
    [handleMouseEnter, handleMouseLeave],
  );

  return [customRef, hovering];
}
