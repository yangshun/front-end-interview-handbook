import { useEffect, useRef } from 'react';

function getScrollParent(element: HTMLElement): HTMLElement | null {
  // Check if scrollable using computed style.
  const style = window.getComputedStyle(element);

  if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
    return element;
  }

  return element.parentElement != null
    ? getScrollParent(element.parentElement)
    : null;
}

export default function useScrollParent(element: HTMLElement | null) {
  const scrollParent = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (element) {
      scrollParent.current = getScrollParent(element);
    }
  }, [element]);

  return scrollParent.current;
}
