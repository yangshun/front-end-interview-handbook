import clsx from 'clsx';
import { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { RiLockFill } from 'react-icons/ri';
import { useHover } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import {
  themeBackgroundCardNoAlphaColor,
  themeBackgroundCardNoAlphaColor_Hover,
  themeBorderElementColor,
  themeBorderElementColor_Hover,
  themeTextColor,
  themeTextFainterColor,
  themeTextFainterColor_Hover,
  themeTextSubtleColor,
  themeTextSuccessColor_Hover,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { InterviewsQuestionItemMinimal } from '../../common/QuestionsTypes';

const progressChipClass = clsx(
  'inline-flex items-center justify-center',
  'rounded-full',
  'transition-colors',
  ['border', themeBorderElementColor],
);

type ProgressChipSize = 'md' | 'sm';

const progressChipSizeClass: Record<ProgressChipSize, string> = {
  md: 'size-8',
  sm: 'size-6',
};

const progressChipIconSizeClass: Record<ProgressChipSize, string> = {
  md: 'size-5',
  sm: 'size-[15px]',
};

function LockedChip({ size = 'md' }: { size?: ProgressChipSize }) {
  const intl = useIntl();
  const progressChipSize = progressChipSizeClass[size];

  return (
    <Tooltip
      asChild={true}
      label={intl.formatMessage({
        defaultMessage: 'Locked',
        description: 'Label for Premium questions label',
        id: 'l6JVmy',
      })}>
      <span className={clsx(progressChipClass, progressChipSize)}>
        <RiLockFill
          aria-hidden={true}
          className={clsx(
            'shrink-0',
            themeTextColor,
            size === 'md' ? 'size-4' : 'size-2.5',
          )}
        />
      </span>
    </Tooltip>
  );
}

export function CompletedChip({
  canShowHoverState,
  onClick,
  size = 'md',
}: Readonly<{
  canShowHoverState: boolean;
  onClick?: () => void;
  size?: ProgressChipSize;
}>) {
  const intl = useIntl();
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark as not complete',
    description: 'Mark question as not complete',
    id: 'BWVaW8',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Completed',
    description: 'Question completion label',
    id: 'TY7Aig',
  });
  const label = onClick ? actionLabel : statusLabel;
  const progressChipSize = progressChipSizeClass[size];
  const iconChipSize = progressChipIconSizeClass[size];

  return (
    <Tooltip asChild={true} label={label}>
      <button
        aria-label={label}
        className={clsx(
          progressChipClass,
          progressChipSize,
          ['border', 'border-success dark:border-success-light'],
          'bg-success dark:bg-success-light',
          'text-white dark:text-neutral-950',
          canShowHoverState && [
            themeTextFainterColor_Hover,
            themeBorderElementColor_Hover,
            themeBackgroundCardNoAlphaColor_Hover,
          ],
          onClick && 'progress-chip focus:ring-brand focus:ring-2',
        )}
        type="button"
        onClick={onClick}>
        <FaCheck
          aria-hidden="true"
          className={clsx('shrink-0', iconChipSize)}
        />
      </button>
    </Tooltip>
  );
}

function CompletedBeforeChip({
  canShowHoverState,
  number,
  onClick,
  size = 'md',
}: Readonly<{
  canShowHoverState: boolean;
  number?: number;
  onClick?: () => void;
  size?: ProgressChipSize;
}>) {
  const intl = useIntl();
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark complete (previously completed)',
    description: 'Label for questions solved in the past',
    id: 'ub/oYs',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Previously completed (before starting this list)',
    description: 'Label for questions solved in the past',
    id: 'RT2AQW',
  });
  const label = onClick ? actionLabel : statusLabel;
  const progressChipSize = progressChipSizeClass[size];
  const iconChipSize = progressChipIconSizeClass[size];

  return (
    <Tooltip asChild={true} label={label}>
      <button
        ref={hoverRef}
        aria-label={label}
        className={clsx(
          progressChipClass,
          progressChipSize,
          themeBackgroundCardNoAlphaColor,
          'font-semibold',
          'border-success dark:border-success-light border border-dashed',
          number != null ? themeTextSubtleColor : themeTextFainterColor,
          canShowHoverState && themeTextSuccessColor_Hover,
          onClick && 'progress-chip focus:ring-brand focus:ring-2',
        )}
        type="button"
        onClick={onClick}>
        {number != null && canShowHoverState && !isHover ? (
          number
        ) : (
          <FaCheck
            aria-hidden="true"
            className={clsx('shrink-0', iconChipSize)}
          />
        )}
      </button>
    </Tooltip>
  );
}

export function NotCompleted({
  canShowHoverState,
  number,
  onClick,
  size = 'md',
}: Readonly<{
  canShowHoverState: boolean;
  number?: number;
  onClick?: () => void;
  size?: ProgressChipSize;
}>) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const intl = useIntl();
  const actionLabel = intl.formatMessage({
    defaultMessage: 'Mark complete',
    description: 'Mark question as complete',
    id: 'C4am9n',
  });
  const statusLabel = intl.formatMessage({
    defaultMessage: 'Not completed',
    description: 'Not completed question',
    id: 'HaM5w5',
  });
  const label = onClick ? actionLabel : statusLabel;
  const progressChipSize = progressChipSizeClass[size];
  const iconChipSize = progressChipIconSizeClass[size];

  return (
    <Tooltip asChild={true} label={label}>
      <button
        ref={hoverRef}
        aria-label={label}
        className={clsx(
          progressChipClass,
          progressChipSize,
          themeBackgroundCardNoAlphaColor,
          ['border', themeBorderElementColor],
          'text-sm font-semibold',
          number != null ? themeTextSubtleColor : themeTextFainterColor,
          canShowHoverState && themeTextSuccessColor_Hover,
          onClick && 'progress-chip focus:ring-brand focus:ring-2',
        )}
        type="button"
        onClick={onClick}>
        {number != null && canShowHoverState && !isHover ? (
          number
        ) : (
          <FaCheck
            aria-hidden="true"
            className={clsx('shrink-0', iconChipSize)}
          />
        )}
      </button>
    </Tooltip>
  );
}

export default function QuestionsListItemProgressChip<
  Q extends InterviewsQuestionItemMinimal,
>({
  className,
  hasCompletedQuestion,
  hasCompletedQuestionBefore,
  index,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  premiumUser,
  question: questionMetadata,
  size = 'md',
}: Readonly<{
  className: string;
  hasCompletedQuestion: boolean;
  hasCompletedQuestionBefore: boolean;
  index?: number;
  onMarkAsCompleted?: (qn: Q) => void;
  onMarkAsNotCompleted?: (qn: Q) => void;
  premiumUser?: boolean;
  question: Q;
  size?: ProgressChipSize;
}>) {
  const [canShowHoverState, setCanShowHoverState] = useState(true);

  return (
    <div
      className={clsx('flex items-center justify-center', className)}
      onMouseLeave={() => {
        setCanShowHoverState(true);
      }}>
      {(() => {
        if (questionMetadata.metadata.access === 'premium' && !premiumUser) {
          return <LockedChip size={size} />;
        }

        if (hasCompletedQuestion) {
          return (
            <CompletedChip
              canShowHoverState={onMarkAsCompleted ? canShowHoverState : false}
              size={size}
              onClick={
                onMarkAsCompleted
                  ? () => {
                      onMarkAsNotCompleted?.(questionMetadata);
                      setCanShowHoverState(false);
                    }
                  : undefined
              }
            />
          );
        }

        return hasCompletedQuestionBefore ? (
          <CompletedBeforeChip
            canShowHoverState={onMarkAsCompleted ? canShowHoverState : false}
            number={index != null ? index + 1 : undefined}
            size={size}
            onClick={
              onMarkAsCompleted
                ? () => {
                    onMarkAsCompleted?.(questionMetadata);
                    setCanShowHoverState(false);
                  }
                : undefined
            }
          />
        ) : (
          <NotCompleted
            canShowHoverState={onMarkAsCompleted ? canShowHoverState : false}
            number={index != null ? index + 1 : undefined}
            size={size}
            onClick={
              onMarkAsCompleted
                ? () => {
                    onMarkAsCompleted?.(questionMetadata);
                    setCanShowHoverState(false);
                  }
                : undefined
            }
          />
        );
      })()}
    </div>
  );
}
