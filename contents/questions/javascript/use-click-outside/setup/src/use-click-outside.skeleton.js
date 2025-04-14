/**
 * @template T
 * @param {import("react").RefObject<T>} ref
 * @param {(event) => void} handler
 * @param {'mousedown' | 'touchstart' | undefined} eventType
 * @param {boolean | AddEventListenerOptions | undefined} eventListenerOptions
 */
export default function useClickOutside(
  ref,
  handler,
  eventType = 'mousedown',
  eventListenerOptions = {},
) {
  throw 'Not implemented';
}
