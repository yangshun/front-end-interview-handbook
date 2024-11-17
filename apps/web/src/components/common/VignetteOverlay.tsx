import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  overlay: React.ReactNode;
  overlayClass?: string;
  showOverlay?: boolean;
}>;

export default function VignetteOverlay({
  children,
  overlay,
  showOverlay = true,
  overlayClass = 'bg-gradient-to-t from-white via-white dark:from-neutral-900 dark:via-neutral-900',
  className,
}: Props) {
  if (!showOverlay) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className={clsx('relative', className)}>
      {children}
      <div className={clsx('absolute bottom-0 top-0 w-full')}>
        <div className={clsx('absolute bottom-0 top-0 w-full', overlayClass)} />
        <div className={clsx('absolute bottom-0 w-full px-8')}>{overlay}</div>
      </div>
    </div>
  );
}
