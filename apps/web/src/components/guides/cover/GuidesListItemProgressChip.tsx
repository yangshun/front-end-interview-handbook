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
}: Readonly<{
  className: string;
  guide: Q;
  hasCompleted: boolean;
  index: number;
  onMarkAsCompleted?: (qn: Q) => void;
  onMarkAsNotCompleted?: (qn: Q) => void;
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
              showHoverState={onMarkAsCompleted ? showHoverState : false}
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
            number={index + 1}
            showHoverState={onMarkAsCompleted ? showHoverState : false}
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
