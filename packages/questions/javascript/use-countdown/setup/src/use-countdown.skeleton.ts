interface UseCountdownOptions {
  countStart: number;
  countStop?: number;
  intervalMs?: number;
  isIncrement?: boolean;
}

interface UseCountdownReturn {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export default function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false,
}: UseCountdownOptions): UseCountdownReturn {
  throw 'Not implemented';
}
