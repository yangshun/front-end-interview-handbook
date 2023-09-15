import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import { RiDraggable } from 'react-icons/ri';

import { useCodingWorkspaceContext } from './CodingWorkspaceContext';
import CodingWorkspaceTimer from './common/CodingWorkspaceTimer';
import type { DraggingEvent } from './useDragging';
import useDragging from './useDragging';

type Props = Readonly<{ className: string }>;

export default function CodingWorkspaceFloatingBar({ className }: Props) {
  const barEl = useRef<HTMLDivElement>(null);
  const canDrag = useCallback(({ clientX }: DraggingEvent) => {
    if (barEl?.current == null) {
      return true;
    }

    const distanceFromEdge = 50;

    return (
      clientX > distanceFromEdge &&
      clientX <
        window.innerWidth -
          (barEl.current.getBoundingClientRect().width + distanceFromEdge)
    );
  }, []);

  const { isDragging, dragOffset, startDragging } = useDragging(canDrag);
  const { status, runTests, submit } = useCodingWorkspaceContext();

  return (
    <div
      ref={barEl}
      className={clsx(
        className,
        'min-w-56 flex h-12 items-center justify-between gap-x-2 rounded-full border border-neutral-600 bg-neutral-800 px-2',
        isDragging && 'cursor-grabbing',
      )}
      style={{
        transform: `translateX(-50%) translateX(${dragOffset.x}px)`,
      }}>
      <div className="flex gap-x-2">
        <button
          className="text-neutral-500"
          type="button"
          onMouseDown={(event) => {
            startDragging(event);
          }}>
          <RiDraggable
            className={clsx(
              'h-4 w-4',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
            )}
          />
        </button>
        <CodingWorkspaceTimer />
      </div>
      <div className="flex gap-x-2">
        <button
          className={clsx(
            'rounded-full px-3 py-2 text-xs font-medium transition-colors hover:bg-neutral-700 disabled:opacity-50',
          )}
          disabled={status !== 'idle'}
          type="button"
          onClick={runTests}>
          Run
        </button>
        <button
          className="rounded-full bg-green-500 px-3 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-green-400"
          type="button">
          Mark as Completed
        </button>
        <button
          className="rounded-full bg-indigo-500 px-3 py-2 text-xs font-medium text-neutral-900 transition-colors hover:bg-indigo-400 disabled:opacity-50"
          disabled={status !== 'idle'}
          type="button"
          onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
