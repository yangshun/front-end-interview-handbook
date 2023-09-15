import clsx from 'clsx';
import { useState } from 'react';
import { RxPause, RxReset, RxStopwatch } from 'react-icons/rx';

export default function CodingWorkspaceTimer() {
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [isTimerHovered, setIsTimerHovered] = useState(false);

  function clearTimer() {
    clearInterval(timer);
    setTimer(undefined);
  }

  return (
    <div
      className={clsx(
        'group flex items-center gap-x-1 rounded-full border border-neutral-600 px-2 py-1',
        isTimerHovered && 'bg-neutral-700',
      )}>
      <button
        className="flex items-center gap-x-1 font-mono text-xs"
        title={timer === null ? 'Start' : 'Pause'}
        type="button"
        onClick={() => {
          if (timer == null) {
            const timerId = setInterval(() => {
              setTimePassedInSeconds((seconds) => seconds + 1);
            }, 1000);

            setTimer(timerId);
          } else {
            clearTimer();
          }
        }}
        onMouseEnter={() => {
          setIsTimerHovered(true);
        }}
        onMouseLeave={() => {
          setIsTimerHovered(false);
        }}>
        {timer == null ? (
          <RxStopwatch aria-hidden={true} className="h-3 w-4" />
        ) : (
          <RxPause aria-hidden={true} className="h-4 w-4" />
        )}
        {new Date(timePassedInSeconds * 1000).toISOString().slice(14, 19)}
      </button>
      <button
        className={clsx(
          'rounded-full p-1 hover:bg-neutral-700',
          timePassedInSeconds === 0 && 'opacity-25',
        )}
        disabled={timePassedInSeconds === 0}
        title="Reset"
        type="button"
        onClick={() => {
          setTimePassedInSeconds(0);
          clearTimer();
        }}>
        <RxReset className="h-3 w-3" />
      </button>
    </div>
  );
}
