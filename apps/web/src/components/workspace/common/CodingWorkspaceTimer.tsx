import clsx from 'clsx';
import { useState } from 'react';
import { RxPause, RxReset, RxStopwatch } from 'react-icons/rx';

export default function CodingWorkspaceTimer() {
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [isTimerHovered, setIsTimeHovered] = useState(false);

  function clearTimer() {
    clearInterval(timer);
    setTimer(undefined);
  }

  return (
    <div
      className={clsx(
        'group flex gap-x-1 px-2 py-1.5 border border-neutral-600 rounded-full items-center',
        isTimerHovered && 'bg-neutral-700',
      )}>
      <button
        className="text-xs font-mono flex gap-x-1 items-center"
        title={timer === null ? 'Start' : 'Pause'}
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
          setIsTimeHovered(true);
        }}
        onMouseLeave={() => {
          setIsTimeHovered(false);
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
          'p-1 hover:bg-neutral-700 rounded-full',
          timePassedInSeconds === 0 && 'opacity-25',
        )}
        disabled={timePassedInSeconds === 0}
        title="Reset"
        onClick={() => {
          setTimePassedInSeconds(0);
          clearTimer();
        }}>
        <RxReset className="h-3 w-3" />
      </button>
    </div>
  );
}
