import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { RxPause, RxPlay, RxStopwatch } from 'react-icons/rx';

import Button from '~/components/ui/Button';
import {
  themeBackgroundColor,
  themeBackgroundEmphasized_Hover,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

import CodingWorkspaceBottomBarEmitter from './CodingWorkspaceBottomBarEmitter';

export default function CodingWorkspaceTimer() {
  const [timePassedInSeconds, setTimePassedInSeconds] = useState(0);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [isTimerHovered, setIsTimerHovered] = useState(false);

  function startTimer() {
    const timerId = setInterval(() => {
      setTimePassedInSeconds((seconds) => seconds + 1);
    }, 1000);

    setTimer(timerId);
  }

  const clearTimer = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  useEffect(() => {
    CodingWorkspaceBottomBarEmitter.on('stop_timer', clearTimer);

    return () => {
      CodingWorkspaceBottomBarEmitter.off('stop_timer', clearTimer);
    };
  }, [timer, clearTimer]);

  if (timer == null && timePassedInSeconds === 0) {
    return (
      <Button
        icon={RxStopwatch}
        isLabelHidden={true}
        label="Start timer"
        size="xs"
        tooltip="Start timer"
        variant="secondary"
        onClick={startTimer}
      />
    );
  }

  return (
    <div
      className={clsx(
        'group flex h-7 items-center gap-x-1 rounded-full px-2',
        ['border', themeBorderElementColor],
        themeBackgroundColor,
        themeTextColor,
        isTimerHovered && 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
      )}>
      <button
        className="flex items-center gap-x-1 font-mono text-xs"
        title={timer === null ? 'Start' : 'Pause'}
        type="button"
        onClick={() => {
          timer == null ? startTimer() : clearTimer();
        }}
        onMouseEnter={() => {
          setIsTimerHovered(true);
        }}
        onMouseLeave={() => {
          setIsTimerHovered(false);
        }}>
        {timer == null ? (
          <RxPlay aria-hidden={true} className="h-3 w-4" />
        ) : (
          <RxPause aria-hidden={true} className="size-4" />
        )}
        {new Date(timePassedInSeconds * 1000).toISOString().slice(14, 19)}
      </button>
      <button
        className={clsx(
          'rounded-full p-1',
          themeBackgroundEmphasized_Hover,
          timePassedInSeconds === 0 && 'opacity-25',
        )}
        disabled={timePassedInSeconds === 0}
        title="Reset"
        type="button"
        onClick={() => {
          setTimePassedInSeconds(0);
          clearTimer();
        }}>
        <RiArrowGoBackLine className="size-3" />
      </button>
    </div>
  );
}
