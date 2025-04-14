import { RefObject, useCallback, useRef } from 'react';

export default function useFocus<T extends HTMLElement>(): [
  RefObject<T>,
  () => void,
] {
  const ref = useRef<T>(null);

  const focusElement = useCallback(() => {
    requestAnimationFrame(() => {
      ref.current?.focus();
    });
  }, []);

  return [ref, focusElement];
}
