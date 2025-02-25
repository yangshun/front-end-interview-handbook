import clsx from 'clsx';
import type { ReactNode } from 'react';

import Banner from '~/components/ui/Banner';
import { textVariants } from '~/components/ui/Text';

export default function BannerShell({
  children,
  className,
  isLoading,
  onHide,
  theme,
}: Readonly<{
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  onHide?: () => void;
  theme?: 'interviews' | 'projects';
}>) {
  return (
    <Banner
      className={clsx(
        'h-6', // Sync with sticky.css.
        textVariants({ color: 'light' }),
        className,
      )}
      data-theme={theme}
      size="xs"
      variant="primary"
      onHide={() => {
        onHide?.();
      }}>
      <span
        className={clsx(
          'transition-opacity duration-500',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
        suppressHydrationWarning={true}>
        {children}
      </span>
    </Banner>
  );
}
