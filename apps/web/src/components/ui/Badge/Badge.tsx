import clsx from 'clsx';

import {
  themeTextBrandColor,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

export type BadgeVariant =
  | 'danger'
  | 'info'
  | 'neutral'
  | 'primary'
  | 'special'
  | 'success'
  | 'warning';
type BadgeSize = 'md' | 'sm';

type Props = Readonly<{
  className?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconClassName?: string;
  label: string;
  size?: BadgeSize;
  variant: BadgeVariant;
}>;

const variantClasses: Record<
  BadgeVariant,
  Readonly<{
    backgroundClass: string;
    borderClass: string;
    iconClass: string;
    textClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lightest dark:bg-danger-darker',
    borderClass: 'border border-danger',
    iconClass: 'text-danger',
    textClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lightest dark:bg-info-darker',
    borderClass: 'border border-info dark:border-info-light',
    iconClass: 'text-info dark:text-info-light',
    textClass: 'text-info dark:text-info-light',
  },
  neutral: {
    backgroundClass: 'bg-neutral-50 dark:bg-neutral-800',
    borderClass: '',
    iconClass: 'text-neutral-500',
    textClass: themeTextSecondaryColor,
  },
  primary: {
    backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
    borderClass: 'border border-brand-dark dark:border-brand',
    iconClass: themeTextBrandColor,
    textClass: themeTextBrandColor,
  },
  special: {
    backgroundClass: 'shiny bg-brand-lightest dark:bg-neutral-800',
    borderClass: '',
    iconClass: themeTextBrandColor,
    textClass: themeTextColor,
  },
  success: {
    backgroundClass: 'bg-success-lightest dark:bg-success-darker',
    borderClass: 'border border-success dark:border-success-light',
    iconClass: 'text-success dark:text-success-light',
    textClass: 'text-success dark:text-success-light',
  },
  warning: {
    backgroundClass: 'bg-warning-lightest dark:bg-warning-darker',
    borderClass: 'border border-warning dark:border-warning-light',
    iconClass: 'text-warning dark:text-warning-light',
    textClass: 'text-warning dark:text-warning-light',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  md: 'px-3 text-sm gap-1.5',
  sm: 'px-2 text-xs gap-1',
};

const iconSizeClasses: Record<BadgeSize, string> = {
  md: '-ms-0.5 size-4',
  sm: '-ms-0.5 size-3',
};

export default function Badge({
  className,
  label,
  icon: Icon,
  size = 'md',
  variant,
  iconClassName,
}: Props) {
  const { backgroundClass, borderClass, textClass, iconClass } =
    variantClasses[variant];

  return (
    <span
      className={clsx(
        'relative inline-flex items-center whitespace-nowrap rounded-full py-px font-medium',
        sizeClasses[size],
        backgroundClass,
        borderClass,
        className,
      )}>
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
      <span className={textClass}>{label}</span>
    </span>
  );
}
