import clsx from 'clsx';
import React from 'react';

import { XMarkIcon } from '@heroicons/react/24/outline';

type BannerVariant = 'primary' | 'special';

type Props = Readonly<{
  children: React.ReactNode;
  onHide?: () => void;
  size?: 'md' | 'sm' | 'xs';
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
  primary: {
    backgroundColorClass: 'bg-brand-500',
    buttonClass: 'hover:bg-brand-400',
    textColorClass: 'text-white',
  },
  special: {
    backgroundColorClass: 'bg-slate-900 dark:bg-white',
    buttonClass: 'hover:bg-slate-700 dark:hover:bg-slate-100',
    textColorClass: 'text-white dark:text-slate-700',
  },
};

export default function Banner({
  children,
  size = 'md',
  variant = 'primary',
  onHide,
}: Props) {
  const { backgroundColorClass, buttonClass, textColorClass } =
    variantClasses[variant];

  return (
    <div
      className={clsx(
        'relative',
        backgroundColorClass,
        textColorClass,
        size === 'md' && 'text-xs sm:text-sm md:text-base',
        size === 'sm' && 'text-xs md:text-sm',
        size === 'xs' && 'text-2xs md:text-xs',
      )}>
      <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium">{children}</p>
        </div>
        {onHide != null && (
          <div
            className={clsx(
              'absolute inset-y-0 right-0 flex items-start sm:items-start',
              size === 'md' && 'pt-1.5 pr-2',
              size === 'sm' && 'pt-1.5 pr-2',
              size === 'xs' && 'pt-1 pr-2',
            )}>
            <button
              className={clsx(
                'flex rounded-md focus:outline-none focus:ring-2 focus:ring-white',
                variant === 'primary' && 'hover:bg-brand-400',
                variant === 'special' && 'hover:bg-slate-700',
                buttonClass,
                textColorClass,
                size === 'md' && 'p-1',
                size === 'sm' && 'p-0.5',
                size === 'xs' && 'p-0.5',
              )}
              type="button"
              onClick={onHide}>
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className={clsx('h-5 w-5')} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
