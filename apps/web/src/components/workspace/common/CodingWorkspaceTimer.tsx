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

import CodingWorkspaceBottomBarEmitter from './CodingWorkspaceBottomBarEmitter';

type Props = Readonly<{
  qnMetadata: QuestionMetadata;
}>;

export default function CodingWorkspaceTimer({ qnMetadata }: Props) {
  const intl = useIntl();
  const qnHash = hashQuestion(qnMetadata);
  const [storedTime, setStoredTime] = useGreatStorageLocal<number>(
    `questions:${qnHash}:timer:value`,
    0,
  );
  const [timerIsRunning, setTimerIsRunning] = useGreatStorageLocal<boolean>(
    `questions:${qnHash}:timer:running`,
    false,
    {
      ttl: 60,
    },
  );

  const [timePassedInSeconds, setTimePassedInSeconds] = useState(storedTime);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isTimerHovered, setIsTimerHovered] = useState(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      return;
    }
    setTimerIsRunning(true);

    timerRef.current = setInterval(() => {
      setTimePassedInSeconds((seconds) => {
        setStoredTime(seconds + 1);

        return seconds + 1;
      });
    }, 1000);
  }, [setStoredTime, setTimerIsRunning]);

  const pauseTimer = useCallback(() => {
    setTimerIsRunning(false);
    setStoredTime(timePassedInSeconds);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [setStoredTime, setTimerIsRunning, timePassedInSeconds]);

  useEffect(() => {
    if (timerIsRunning && !timerRef.current) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTimer, timerIsRunning]);

  useEffect(() => {
    CodingWorkspaceBottomBarEmitter.on('pause_timer', pauseTimer);

    return () => {
      CodingWorkspaceBottomBarEmitter.off('pause_timer', pauseTimer);
    };
  }, [pauseTimer]);

  if (timerRef.current == null && timePassedInSeconds === 0) {
    return (
      <Button
        icon={RxStopwatch}
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Start timer',
          description: 'Start coding workspace timer label',
          id: '49NIXE',
        })}
        size="xs"
        tooltip={intl.formatMessage({
          defaultMessage: 'Start timer',
          description: 'Start coding workspace timer label',
          id: '49NIXE',
        })}
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
        className={clsx(
          'flex items-center gap-x-1 text-xs',
          'font-mono', // To prevent shifting
        )}
        title={timerRef.current === null ? 'Start' : 'Pause'}
        type="button"
        onClick={() => {
          timerRef.current === null ? startTimer() : pauseTimer();
        }}
        onMouseEnter={() => setIsTimerHovered(true)}
        onMouseLeave={() => setIsTimerHovered(false)}>
        {timerRef.current === null ? (
          <RxPlay aria-hidden={true} className="h-3 w-4" />
        ) : (
          <RxPause aria-hidden={true} className="size-4" />
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
          setTimePassedInSeconds(0);
          pauseTimer();
          setStoredTime(0);
        }}>
        <RiArrowGoBackLine className="size-3" />
      </button>
    </div>
  );
}
