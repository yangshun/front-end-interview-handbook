const DEFAULT_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel',
];

export default function useIdle(
  ms = 60_000,
  initialState = false,
  events: (keyof WindowEventMap)[] = DEFAULT_EVENTS,
): boolean {
  throw 'Not implemented';
}
