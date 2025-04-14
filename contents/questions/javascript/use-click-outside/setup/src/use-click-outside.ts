import { RefObject, useEffect, useRef } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: 'mousedown' | 'touchstart' = 'mousedown',
  eventListenerOptions: boolean | AddEventListenerOptions = {},
) {
  const latestHandler = useRef(handler);
  latestHandler.current = handler;

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node;
      if (!target || !target.isConnected) {
        return;
      }

      const outside = ref.current && !ref.current.contains(target);
      if (!outside) {
        return;
      }

      latestHandler.current(event);
    };

    window.addEventListener(eventType, listener, eventListenerOptions);

    return () => {
      window.removeEventListener(eventType, listener, eventListenerOptions);
    };
  }, [ref, eventType, eventListenerOptions]);
}
