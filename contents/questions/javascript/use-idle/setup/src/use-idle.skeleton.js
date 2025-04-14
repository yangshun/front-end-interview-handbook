/**
 * @type {(keyof WindowEventMap)[]}
 */
const DEFAULT_EVENTS = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel',
];

/**
 *
 * @param {number} ms
 * @param {boolean} initialState
 * @param {(keyof WindowEventMap)[]} events
 * @returns {boolean}
 */
export default function useIdle(
  ms = 60_000,
  initialState = false,
  events = DEFAULT_EVENTS,
) {
  throw 'Not implemented';
}
