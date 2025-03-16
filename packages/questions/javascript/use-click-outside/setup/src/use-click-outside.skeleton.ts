import { RefObject } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: 'mousedown' | 'touchstart' = 'mousedown',
  eventListenerOptions?: boolean | AddEventListenerOptions,
) {
  throw 'Not implemented';
}
