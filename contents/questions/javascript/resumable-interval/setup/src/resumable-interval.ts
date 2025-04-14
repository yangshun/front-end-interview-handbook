interface Resumable {
  start: () => void;
  pause: () => void;
  stop: () => void;
}

export default function createResumableInterval(
  callback: Function,
  delay?: number,
  ...args: Array<any>
): Resumable {
  let timerId: number | null = null;
  let stopped = false;

  function start() {
    if (stopped || timerId != null) {
      return;
    }

    callback(...args);
    timerId = setInterval(callback, delay, ...args);
  }

  function clearTimer() {
    clearInterval(timerId ?? undefined);
    timerId = null;
  }

  function pause() {
    if (stopped) {
      return;
    }

    clearTimer();
  }

  function stop() {
    stopped = true;
    clearTimer();
  }

  return {
    start,
    pause,
    stop,
  };
}
