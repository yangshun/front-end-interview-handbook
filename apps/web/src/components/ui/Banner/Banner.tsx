import clsx from 'clsx';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';

import Text from '../Text';

type BannerVariant = 'custom' | 'neutral' | 'primary';

type Props = React.HTMLAttributes<HTMLDivElement> &
  Readonly<{
    children: React.ReactNode;
    className?: string;
    onHide?: () => void;
    size?: 'md' | 'sm' | 'xs';
    truncate?: boolean;
    variant?: BannerVariant;
  }>;

const variantClasses: Record<
  BannerVariant,
  Readonly<{
    backgroundColorClass: string;
    textColorClass: string;
  }>
> = {
  custom: {
    backgroundColorClass: '',
    textColorClass: '',
  },
  neutral: {
    backgroundColorClass: 'bg-neutral-800',
    textColorClass: 'text-white',
  },
  primary: {
    backgroundColorClass: 'bg-brand-light',
    textColorClass: 'text-neutral-900',
  },
};

export default function Banner({
  className,
  children,
  size = 'md',
  variant = 'primary',
  truncate,
  onHide,
  ...props
}: Props) {
  const { backgroundColorClass, textColorClass } = variantClasses[variant];

  return (
    <div
      className={clsx(
        'relative flex items-center',
        backgroundColorClass,
        textColorClass,
        className,
        size === 'md' && 'min-h-11',
        size === 'sm' && 'min-h-7',
        size === 'xs' && 'min-h-7',
      )}
      {...props}>
      <div className={clsx('mx-auto w-full', 'px-4 sm:px-6')}>
        <div className={clsx('flex items-center justify-center gap-4', 'pr-8')}>
          <Text
            className={clsx(
              'flex gap-4',
              size === 'md' && 'text-2xs sm:text-xs md:text-sm lg:text-base',
              size === 'sm' && 'text-2xs sm:text-xs md:text-sm',
              size === 'xs' && 'text-2xs sm:text-xs',
              truncate && 'truncate',
            )}
            color="inherit"
            size="inherit"
            weight="medium">
            {children}
          </Text>
        </div>
        {onHide != null && (
          <div
            className={clsx(
              'absolute inset-y-0 right-0 flex h-full items-center pr-2 sm:pt-0',
            )}>
            <Button
              className={clsx(
                'border-transparent',
                'hover:bg-neutral-700/50',
                'active:bg-neutral-700/25',
                // Force black text when primary.
                variant === 'primary' ? '!text-neutral-900' : undefined,
              )}
              icon={RiCloseLine}
              isLabelHidden={true}
              label="Close"
              size="xs"
              variant="unstyled"
              onClick={onHide}
            />
          </div>
        )}
      </div>
    </div>
  );
}
