'use client';

import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { RxPause, RxPlay, RxStopwatch } from 'react-icons/rx';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import {
  themeBackgroundColor,
  themeBackgroundEmphasized_Hover,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';

import { hashQuestion } from '~/db/QuestionsUtils';

import {
  useCodingWorkspaceDispatch,
  useCodingWorkspaceSelector,
} from './store/hooks';
import { pauseTimer, startTimer } from './store/timer-slice';

type Props = Readonly<{
  qnMetadata: QuestionMetadata;
}>;

export default function CodingWorkspaceTimer({ qnMetadata }: Props) {
  const intl = useIntl();
  const qnHash = hashQuestion(qnMetadata);
  const [timePassedInSeconds, setTimePassedInSeconds] =
    useGreatStorageLocal<number>(`questions:${qnHash}:timer:value`, 0);
  const [showFullTimer, setShowFullTimer] = useState(timePassedInSeconds > 0);
  const timePassedInSecondsRef = useRef(timePassedInSeconds);

  timePassedInSecondsRef.current = timePassedInSeconds;

  const isTimerRunning = useCodingWorkspaceSelector(
    (state) => state.timer.running,
  );
  const workspaceDispatch = useCodingWorkspaceDispatch();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTimerHovered, setIsTimerHovered] = useState(false);

  const startTimerInterval = useCallback(() => {
    clearInterval(timerRef.current || undefined);

    timerRef.current = setInterval(() => {
      setTimePassedInSeconds((seconds) => seconds + 1);
    }, 1000);
  }, [setTimePassedInSeconds]);

  const clearTimerInterval = useCallback(() => {
    clearInterval(timerRef.current || undefined);
    timerRef.current = null;
  }, []);

  function resetTimer() {
    setTimePassedInSeconds(0);
    clearTimerInterval();
    workspaceDispatch(pauseTimer());
  }

  useEffect(() => {
    if (isTimerRunning && !timerRef.current) {
      startTimerInterval();
      setShowFullTimer(true);
    }

    return () => {
      clearTimerInterval();
    };
  }, [startTimerInterval, clearTimerInterval, isTimerRunning]);

  const startTimerLabel = intl.formatMessage({
    defaultMessage: 'Start timer',
    description: 'Start coding workspace timer label',
    id: '49NIXE',
  });

  if (!showFullTimer) {
    return (
      <Button
        icon={RxStopwatch}
        isLabelHidden={true}
        label={startTimerLabel}
        size="xs"
        tooltip={startTimerLabel}
        variant="secondary"
        onClick={() => {
          workspaceDispatch(startTimer());
        }}
      />
    );
  }

  return (
    <div
      className={clsx(
        'flex items-center gap-x-1',
        'group overflow-y-hidden',
        'rounded-full',
        'h-7 px-2',
        ['border', themeBorderElementColor],
        themeBackgroundColor,
        themeTextColor,
        isTimerHovered && 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
      )}>
      <button
        className={clsx(
          'flex items-center gap-x-1 text-xs',
          'font-mono', // To prevent shifting
        )}
        title={timerRef.current === null ? startTimerLabel : 'Pause'}
        type="button"
        onClick={() => {
          isTimerRunning
            ? workspaceDispatch(pauseTimer())
            : workspaceDispatch(startTimer());
        }}
        onMouseEnter={() => setIsTimerHovered(true)}
        onMouseLeave={() => setIsTimerHovered(false)}>
        {isTimerRunning ? (
          <RxPause aria-hidden={true} className="size-4" />
        ) : (
          <RxPlay aria-hidden={true} className="h-3 w-4" />
        )}
        <div className="flex items-center">
          <NumberFlowGroup>
            <NumberFlow
              digits={{ 1: { max: 5 } }}
              format={{ minimumIntegerDigits: 2 }}
              style={{
                fontFamily: 'sans-serif',
                fontSize: '1.1em',
              }}
              trend={+1}
              value={Math.floor((timePassedInSeconds % 3600) / 60)}
            />
            <span>:</span>
            <NumberFlow
              digits={{ 1: { max: 5 } }}
              format={{ minimumIntegerDigits: 2 }}
              style={{
                fontFamily: 'sans-serif',
                fontSize: '1.1em',
              }}
              trend={+1}
              value={timePassedInSeconds % 60}
            />{' '}
          </NumberFlowGroup>{' '}
        </div>
      </button>
      <button
        className={clsx(
          'rounded-full p-1',
          themeBackgroundEmphasized_Hover,
          timePassedInSeconds === 0 && 'opacity-25',
        )}
        disabled={timePassedInSeconds === 0}
        title={intl.formatMessage({
          defaultMessage: 'Reset',
          description: 'Reset coding workspace timer button label',
          id: 'Tbgxbk',
        })}
        type="button"
        onClick={() => {
          resetTimer();
        }}>
        <RiArrowGoBackLine className="size-3" />
      </button>
    </div>
  );
}
