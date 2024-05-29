import clsx from 'clsx';
import { h } from 'preact';
import { PiCursorClickFill } from 'react-icons/pi';

export function EmptyState() {
  return (
    <div className="size-full p-3">
      <div className={clsx('grid place-items-center', 'size-full')}>
        <div className="flex flex-col items-center gap-4">
          <PiCursorClickFill
            className="text-neutral-500 size-16 shrink-0"
            aria-hidden={true}
          />
          <p
            className={clsx(
              'text-sm text-center max-w-56',
              'text-neutral-700 dark:text-neutral-300',
            )}>
            Select <span className="font-bold">one</span> frame or text layer
          </p>
        </div>
      </div>
    </div>
  );
}
