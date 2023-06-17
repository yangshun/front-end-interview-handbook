import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import { themeGlassyBorder } from '~/components/ui/theme';

type Props = PropsWithChildren<{
  stripClassName?: string;
}>;

export default function QuestionListingSideCard({
  children,
  stripClassName,
}: Props) {
  return (
    <div
      className={clsx(
        'relative flex overflow-clip rounded-lg bg-white dark:bg-neutral-800/40',
        themeGlassyBorder,
      )}>
      <div
        aria-hidden="true"
        className={clsx('absolute h-full w-1.5', stripClassName)}
      />
      <div className="flex-1 py-3 px-4">{children}</div>
    </div>
  );
}
