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
  className,
  overlay,
  overlayClass = 'bottom-0',
  showOverlay = true,
}: Props) {
  if (!showOverlay) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className={clsx('relative isolate overflow-hidden', className)}>
      {children}
      <div className={clsx('absolute bottom-0 top-0 w-full')}>
        <div
          className={clsx(
            'absolute bottom-0 top-0 w-full',
            'bg-gradient-to-t via-75% lg:via-50%',
            'from-white via-white',
            'dark:from-neutral-900 dark:via-neutral-900',
          )}
        />
        <div className={clsx('absolute z-[1] w-full', overlayClass)}>
          {overlay}
        </div>
      </div>
    </div>
  );
}
