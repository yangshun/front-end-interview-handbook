import clsx from 'clsx';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';

import Text from '../Text';

type BannerVariant = 'custom' | 'primary' | 'special';

type Props = Readonly<{
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
    buttonClass: string;
    textColorClass: string;
  }>
> = {
  custom: {
    backgroundColorClass: '',
    buttonClass: '',
    textColorClass: '',
  },
  primary: {
    backgroundColorClass: 'bg-brand-dark',
    buttonClass: 'hover:bg-brand',
    textColorClass: 'text-neutral-900',
  },
  special: {
    backgroundColorClass: 'bg-neutral-800',
    buttonClass: 'hover:bg-neutral-700',
    textColorClass: 'text-white',
  },
};

export default function Banner({
  className,
  children,
  size = 'md',
  variant = 'primary',
  truncate,
  onHide,
}: Props) {
  const { backgroundColorClass, buttonClass, textColorClass } =
    variantClasses[variant];

  return (
    <div
      className={clsx(
        'relative flex items-center',
        backgroundColorClass,
        textColorClass,
        className,
      )}>
      <div
        className={clsx(
          'mx-auto w-full max-w-7xl',
          'px-4 sm:px-6 lg:px-8',
          size === 'md' && 'py-3',
          size === 'sm' && 'py-2',
          size === 'xs' && 'py-2',
        )}>
        <div className="pr-8 sm:px-8 sm:text-center">
          <Text
            className={clsx(
              'block',
              size === 'md' && 'text-xs sm:text-sm md:text-base',
              size === 'sm' && 'text-xs md:text-sm',
              size === 'xs' && 'text-xs',
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
            <button
              className={clsx(
                'flex rounded-md focus:outline-none focus:ring-2 focus:ring-white',
                variant === 'primary' && 'hover:bg-brand',
                variant === 'special' && 'hover:bg-neutral-700',
                buttonClass,
                textColorClass,
                size === 'md' && 'p-1',
                size === 'sm' && 'p-0.5',
                size === 'xs' && 'p-0.5',
              )}
              type="button"
              onClick={onHide}>
              <span className="sr-only">Dismiss</span>
              <RiCloseLine aria-hidden="true" className={clsx('size-5')} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
