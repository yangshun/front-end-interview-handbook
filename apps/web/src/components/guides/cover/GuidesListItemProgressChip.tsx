import clsx from 'clsx';
import { useState } from 'react';

import type { GuideCardMetadata } from '~/components/guides/types';
import {
  CompletedChip,
  NotCompleted,
} from '~/components/interviews/questions/listings/items/QuestionsListItemProgressChip';

export default function GuidesListItemProgressChip<
  Q extends GuideCardMetadata,
>({
  className,
  hasCompleted,
  index,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  guide,
  size,
}: Readonly<{
  className: string;
  guide: Q;
  hasCompleted: boolean;
  index?: number;
  onMarkAsCompleted?: (qn: Q) => void;
  onMarkAsNotCompleted?: (qn: Q) => void;
  size?: 'md' | 'sm';
}>) {
  const [showHoverState, setShowHoverState] = useState(true);

  return (
    <div
      className={clsx('flex items-center justify-center', className)}
      onMouseLeave={() => {
        setShowHoverState(true);
      }}>
      {(() => {
        if (hasCompleted) {
          return (
            <CompletedChip
              canShowHoverState={onMarkAsCompleted ? showHoverState : false}
              size={size}
              onClick={
                onMarkAsCompleted
                  ? () => {
                      onMarkAsNotCompleted?.(guide);
                      setShowHoverState(false);
                    }
                  : undefined
              }
            />
          );
        }

        return (
          <NotCompleted
            canShowHoverState={onMarkAsCompleted ? showHoverState : false}
            number={index != null ? index + 1 : undefined}
            size={size}
            onClick={
              onMarkAsCompleted
                ? () => {
                    onMarkAsCompleted?.(guide);
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
