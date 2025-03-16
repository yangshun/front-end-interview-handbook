import { useEffect, useState } from 'react';

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
  const [idle, setIdle] = useState<boolean>(initialState);

  useEffect(() => {
    let timeoutId: number;

    function handleTimeout() {
      setIdle(true);
    }

    function handleEvent() {
      setIdle(false);

      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleTimeout, ms);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        return;
      }

      handleEvent();
    }

    timeoutId = setTimeout(handleTimeout, ms);

    events.forEach((event) => window.addEventListener(event, handleEvent));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);

      events.forEach((event) => window.removeEventListener(event, handleEvent));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  });

  return idle;
}
