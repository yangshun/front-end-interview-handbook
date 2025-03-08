import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { BannerVariant } from '~/components/ui/Banner';
import Banner from '~/components/ui/Banner';

export default function GlobalBannerShell({
  children,
  className,
  isLoading,
  onHide,
  variant,
  theme,
}: Readonly<{
  children: ReactNode;
  className?: string;
  isLoading: boolean;
  onHide?: () => void;
  theme?: 'interviews' | 'projects';
  variant: BannerVariant;
}>) {
  return (
    <Banner
      className={clsx(
        'h-6', // Sync with sticky.css.
        className,
      )}
      data-theme={theme}
      size="xs"
      variant={variant}
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
