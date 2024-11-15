import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
  overlay: React.ReactNode;
  overlayClass?: string;
}>;

export default function VignetteOverlay({
  children,
  overlay,
  overlayClass = 'bg-gradient-to-t from-white via-white dark:from-neutral-900 dark:via-neutral-900',
}: Props) {
  return (
    <div className="relative">
      {children}
      <div className={clsx('absolute bottom-0 top-0 w-full')}>
        <div className={clsx('absolute bottom-0 top-0 w-full', overlayClass)} />
        <div className={clsx('absolute bottom-0 w-full px-8')}>{overlay}</div>
      </div>
    </div>
  );
}
