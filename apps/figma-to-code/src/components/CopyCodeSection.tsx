import clsx from 'clsx';
import type { VNode } from 'preact';
import { h } from 'preact';

import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useHover } from '../hooks/useHover';

export function CopyCodeSection({
  codeToCopy,
  code,
  title,
}: Readonly<{
  code: VNode | string | null;
  codeToCopy: string | null;
  title: string;
}>) {
  const [, copyCss] = useCopyToClipboard();
  const { isHovering, onMouseEnter, onMouseLeave } = useHover();

  if (!code) {
    return null;
  }

  return (
    <div className="p-3 flex flex-col gap-y-3 group">
      <div className="flex gap-4 justify-between items-center">
        <h2 className="font-semibold">{title}</h2>
        <button
          className={clsx(
            'invisible group-hover:visible font-semibold',
            'text-green-600 dark:text-green-500',
          )}
          onClick={() => {
            if (!codeToCopy) {
              return;
            }

            copyCss(codeToCopy);
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          Copy
        </button>
      </div>
      <pre
        className={clsx(
          'p-2 rounded-sm',
          'text-wrap select-text',
          'overflow-x-auto',
          [
            isHovering
              ? 'bg-green-50 dark:bg-green-900'
              : 'bg-neutral-50 dark:bg-neutral-700',
          ],
          [
            'outline outline-1',
            isHovering
              ? 'outline-green-600 dark:outline-green-400'
              : 'outline-transparent',
          ],
        )}>
        {code}
      </pre>
    </div>
  );
}
