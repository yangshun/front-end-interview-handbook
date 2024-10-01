import clsx from 'clsx';
import { useRef, useState } from 'react';
import { RiCheckFill, RiLockLine } from 'react-icons/ri';
import { useHover } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import {
  themeBackgroundCardNoAlphaColor,
  themeBackgroundCardNoAlphaColor_Hover,
  themeBorderElementColor,
  themeBorderElementColor_Hover,
  themeTextFainterColor,
  themeTextSubtleColor,
  themeTextSuccessColor_Hover,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionMetadata } from '../../common/QuestionsTypes';

const progressChipSizeClass = clsx(
  'inline-flex items-center justify-center',
  'size-8 rounded-full',
  'transition-colors',
);

function LockedChip() {
  const intl = useIntl();

  return (
    <Tooltip
      asChild={true}
      label={intl.formatMessage({
        defaultMessage: 'Locked',
        description: 'Label for Premium questions label',
        id: 'l6JVmy',
      })}>
      <span
        className={clsx(
          progressChipSizeClass,
          'relative',
          'shiny',
          'bg-brand-dark dark:bg-brand/20',
        )}>
        <RiLockLine aria-hidden={true} className="size-4 shrink-0 text-white" />
      </span>
    </Tooltip>
  );
}

export function CompletedChip({
  showHoverState,
  onClick,
}: Readonly<{
  onClick?: () => void;
  showHoverState: boolean;
}>) {
  const intl = useIntl();
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark as not complete',
    description: 'Mark question as not complete',
    id: 'BWVaW8',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Completed',
    description: 'Completed question',
    id: 'yVJzTk',
  });
  const label = onClick ? actionLabel : statusLabel;

  return (
    <Tooltip asChild={true} label={label}>
      <button
        aria-label={label}
        className={clsx(
          progressChipSizeClass,
          ['border', 'border-success dark:border-success-light'],
          'bg-success dark:bg-success-light',
          themeTextFainterColor,
          showHoverState && [
            themeBorderElementColor_Hover,
            themeBackgroundCardNoAlphaColor_Hover,
          ],
        )}
        type="button"
        onClick={onClick}>
        <RiCheckFill aria-hidden="true" className={clsx('size-5')} />
      </button>
    </Tooltip>
  );
}

function CompletedBeforeChip({
  showHoverState,
  onClick,
}: Readonly<{
  onClick?: () => void;
  showHoverState: boolean;
}>) {
  const intl = useIntl();
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark as complete (previously completed)',
    description: 'Label for questions solved in the past',
    id: 'ew9tI2',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Previously completed (before starting this list)',
    description: 'Label for questions solved in the past',
    id: 'RT2AQW',
  });
  const label = onClick ? actionLabel : statusLabel;

  return (
    <Tooltip asChild={true} label={label}>
      <button
        aria-label={label}
        className={clsx(
          progressChipSizeClass,
          [themeTextSubtleColor, 'font-semibold'],
          themeBackgroundCardNoAlphaColor,
          'border-success border border-dashed',
          showHoverState && [
            'hover:border-solid',
            themeBorderElementColor_Hover,
            themeTextFainterColor,
            themeTextSuccessColor_Hover,
          ],
        )}
        type="button"
        onClick={onClick}>
        <RiCheckFill aria-hidden="true" className={clsx('size-5')} />
      </button>
    </Tooltip>
  );
}

export function NotCompleted({
  number,
  showAsNumber,
  showHoverState,
  onClick,
}: Readonly<{
  number: number;
  onClick?: () => void;
  showAsNumber: boolean;
  showHoverState: boolean;
}>) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const intl = useIntl();
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark as complete',
    description: 'Mark question as complete',
    id: '6y6SUS',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Not completed',
    description: 'Not completed question',
    id: 'HaM5w5',
  });
  const label = onClick ? actionLabel : statusLabel;

  return (
    <Tooltip asChild={true} label={label}>
      <button
        ref={hoverRef}
        aria-label={label}
        className={clsx(
          progressChipSizeClass,
          themeBackgroundCardNoAlphaColor,
          ['border', themeBorderElementColor],
          showAsNumber ? themeTextSubtleColor : themeTextFainterColor,
          showHoverState && themeTextSuccessColor_Hover,
        )}
        type="button"
        onClick={onClick}>
        {showAsNumber && showHoverState && !isHover ? (
          number
        ) : (
          <RiCheckFill aria-hidden="true" className={clsx('size-5')} />
        )}
      </button>
    </Tooltip>
  );
}

export default function QuestionsListItemProgressChip<
  Q extends QuestionMetadata,
>({
  className,
  question,
  premiumUser,
  hasCompletedQuestion,
  hasCompletedQuestionBefore,
  mode,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  index,
}: Readonly<{
  className: string;
  hasCompletedQuestion: boolean;
  hasCompletedQuestionBefore: boolean;
  index: number;
  mode?: 'default' | 'learning-list';
  onMarkAsCompleted?: (qn: Q) => void;
  onMarkAsNotCompleted?: (qn: Q) => void;
  premiumUser?: boolean;
  question: Q;
}>) {
  const [showHoverState, setShowHoverState] = useState(true);

  return (
    <div
      className={clsx('flex items-center justify-center', className)}
      onMouseLeave={() => {
        setShowHoverState(true);
      }}>
      {(() => {
        if (question.premium && !premiumUser) {
          return <LockedChip />;
        }

        if (hasCompletedQuestion) {
          return (
            <CompletedChip
              showHoverState={onMarkAsCompleted ? showHoverState : false}
              onClick={
                onMarkAsCompleted
                  ? () => {
                      onMarkAsNotCompleted?.(question);
                      setShowHoverState(false);
                    }
                  : undefined
              }
            />
          );
        }

        return hasCompletedQuestionBefore ? (
          <CompletedBeforeChip
            showHoverState={onMarkAsCompleted ? showHoverState : false}
            onClick={
              onMarkAsCompleted
                ? () => {
                    onMarkAsCompleted?.(question);
                    setShowHoverState(false);
                  }
                : undefined
            }
          />
        ) : (
          <NotCompleted
            number={index + 1}
            showAsNumber={mode === 'learning-list'}
            showHoverState={onMarkAsCompleted ? showHoverState : false}
            onClick={
              onMarkAsCompleted
                ? () => {
                    onMarkAsCompleted?.(question);
                    setShowHoverState(false);
                  }
                : undefined
            }
          />
        );
      })()}
    </div>
  );
}
