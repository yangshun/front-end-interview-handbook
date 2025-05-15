import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { type ForwardedRef, forwardRef } from 'react';

import {
  themeTextBrandColor,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSubtitleColor,
  themeTextSuccessColor,
  themeTextWarningColor,
} from '~/components/ui/theme';

export type BadgeVariant =
  | 'danger'
  | 'info'
  | 'neutral-active'
  | 'neutral'
  | 'primary'
  | 'special'
  | 'success'
  | 'warning';
export type BadgeSize = 'md' | 'sm' | 'xs';

type Props = HTMLAttributes<HTMLSpanElement> &
  Readonly<{
    className?: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClassName?: string;
    label: string;
    labelClassName?: string;
    size?: BadgeSize;
    variant: BadgeVariant;
  }>;

const variantClasses: Record<
  BadgeVariant,
  Readonly<{
    backgroundClass: string;
    borderClass: string;
    iconClass: string;
    paddingClass: string;
    textClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lightest dark:bg-danger-darker',
    borderClass: 'border border-danger',
    iconClass: 'text-danger',
    paddingClass: 'py-px',
    textClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lightest dark:bg-info-darker',
    borderClass: 'border border-info dark:border-info-light',
    iconClass: 'text-info dark:text-info-light',
    paddingClass: 'py-px',
    textClass: 'text-info dark:text-info-light',
  },
  neutral: {
    backgroundClass: 'bg-neutral-50 dark:bg-neutral-800',
    borderClass: 'border border-neutral-500',
    iconClass: 'text-neutral-500',
    paddingClass: 'py-px',
    textClass: themeTextSecondaryColor,
  },
  'neutral-active': {
    backgroundClass: 'bg-neutral-50 dark:bg-neutral-800',
    borderClass: 'border border-transparent',
    iconClass: 'text-neutral-500',
    paddingClass: 'py-px',
    textClass: themeTextColor,
  },
  primary: {
    backgroundClass: 'bg-brand-dark dark:bg-brand',
    borderClass: 'border border-brand-dark dark:border-brand',
    iconClass: 'text-neutral-900',
    paddingClass: 'py-px',
    textClass: 'text-neutral-900',
  },
  special: {
    backgroundClass: 'shiny bg-brand-lightest dark:bg-neutral-800',
    borderClass: '',
    iconClass: themeTextBrandColor,
    paddingClass: 'py-0.5',
    textClass: themeTextSubtitleColor,
  },
  success: {
    backgroundClass: 'bg-success-lightest dark:bg-success-darker',
    borderClass: 'border border-success dark:border-success-light',
    iconClass: themeTextSuccessColor,
    paddingClass: 'py-px',
    textClass: themeTextSuccessColor,
  },
  warning: {
    backgroundClass: 'bg-warning-lightest dark:bg-warning-darker',
    borderClass: 'border border-warning dark:border-warning-light',
    iconClass: themeTextWarningColor,
    paddingClass: 'py-px',
    textClass: themeTextWarningColor,
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  md: 'px-3 text-sm gap-1.5',
  sm: 'px-2 text-xs gap-1',
  xs: 'px-1.5 text-2xs gap-1',
};

const iconSizeClasses: Record<BadgeSize, string> = {
  md: '-ms-0.5 size-4',
  sm: '-ms-0.5 size-3',
  xs: '-ms-0.5 size-2.5',
};

function Badge(
  {
    className,
    icon: Icon,
    iconClassName,
    label,
    labelClassName,
    size = 'md',
    variant,
    ...props
  }: Props,
  ref: ForwardedRef<HTMLSpanElement>,
) {
  const { backgroundClass, borderClass, iconClass, paddingClass, textClass } =
    variantClasses[variant];

  return (
    <span
      ref={ref}
      className={clsx(
        'relative', // Needed by special to render the border.
        'inline-flex items-center',
        'rounded-full',
        sizeClasses[size],
        backgroundClass,
        borderClass,
        paddingClass,
        className,
      )}
      {...props}>
      {Icon && (
        <Icon
          aria-hidden={true}
          className={clsx(
            'shrink-0',
            iconClass,
            iconSizeClasses[size],
            iconClassName,
          )}
        />
      )}
      <span
        className={clsx(
          'whitespace-nowrap font-medium',
          textClass,
          labelClassName,
        )}>
        {label}
      </span>
    </span>
  );
}

export default forwardRef(Badge);
