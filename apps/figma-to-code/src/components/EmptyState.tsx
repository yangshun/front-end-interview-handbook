import clsx from 'clsx';
import { h } from 'preact';

export function EmptyState() {
  return (
    <div className="size-full p-3">
      <div
        className={clsx(
          'grid place-items-center',
          'size-full',
          'border border-sky-300',
          'text-center text-sm',
          'text-sky-700 bg-sky-50',
          'p-6 rounded',
        )}>
        Select an element to inspect its properties (maximum of one)
      </div>
    </div>
  );
}
