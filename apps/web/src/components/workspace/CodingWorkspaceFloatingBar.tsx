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
        'border border-neutral-600 bg-neutral-800 h-12 rounded-full min-w-56 flex items-center justify-between px-2 gap-x-2',
        isDragging && 'cursor-grabbing',
      )}
      style={{
        transform: `translateX(-50%) translateX(${dragOffset.x}px)`,
      }}>
      <div className="flex gap-x-2">
        <button
          className="text-neutral-500"
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
            'px-3 py-2 font-medium rounded-full text-xs hover:bg-neutral-700 transition-colors disabled:opacity-50',
          )}
          disabled={status !== 'idle'}
          onClick={runTests}>
          Run
        </button>
        <button className="px-3 py-2 bg-green-500 hover:bg-green-400 transition-colors font-medium text-neutral-900 rounded-full text-xs">
          Mark as Completed
        </button>
        <button
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-400 transition-colors font-medium text-neutral-900 rounded-full text-xs disabled:opacity-50"
          disabled={status !== 'idle'}
          onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}
