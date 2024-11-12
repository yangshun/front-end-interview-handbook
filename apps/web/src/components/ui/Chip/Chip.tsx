import clsx from 'clsx';

import { themeTextBrandColor, themeTextColor } from '../theme';

export type ChipSize = 'md' | 'sm' | 'xs';

export type ChipVariant =
  | 'active'
  | 'neutral-active'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'special'
  | 'success'
  | 'warning';

type Props = Readonly<
  {
    'aria-hidden'?: boolean;
    className?: string;
    iconClassName?: string;
    label: string;
    size?: ChipSize;
    variant: ChipVariant;
  } & (
    | {
        icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
        isLabelHidden: true;
      }
    | { icon?: undefined; isLabelHidden?: false }
  )
>;

const variantClasses: Record<
  ChipVariant,
  Readonly<{
    backgroundClass: string;
    borderClass: string;
    iconClass: string;
    textClass: string;
  }>
> = {
  active: {
    backgroundClass: 'bg-brand-lightest dark:bg-brand/20',
    borderClass: 'border border-brand',
    iconClass: 'text-brand',
    textClass: 'text-brand',
  },
  neutral: {
    backgroundClass: 'bg-neutral-100 dark:bg-neutral-800',
    borderClass: 'border border-neutral-200 dark:border-neutral-700',
    iconClass: 'text-neutral-500',
    textClass: 'text-neutral-500 dark:text-neutral-400',
  },
  'neutral-active': {
    backgroundClass: '',
    borderClass: 'border border-neutral-700 dark:border-neutral-100',
    iconClass: themeTextColor,
    textClass: themeTextColor,
  },
  primary: {
    backgroundClass: 'bg-brand-dark dark:bg-brand',
    borderClass: '',
    iconClass: 'text-white',
    textClass: 'text-white',
  },
  secondary: {
    backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
    borderClass: 'border border-dashed border-brand-dark dark:border-brand',
    iconClass: themeTextBrandColor,
    textClass: themeTextBrandColor,
  },
  special: {
    backgroundClass: 'shiny bg-brand-dark dark:bg-brand/20',
    borderClass: 'drop-shadow-md',
    iconClass: 'text-white',
    textClass: 'text-white',
  },
  success: {
    backgroundClass: 'bg-success dark:bg-success-light',
    borderClass: '',
    iconClass: 'text-white dark:text-neutral-900',
    textClass: 'text-white dark:text-neutral-100',
  },
  warning: {
    backgroundClass: 'bg-warning',
    borderClass: '',
    iconClass: 'text-white',
    textClass: 'text-white',
  },
};

const sizeClasses: Record<ChipSize, string> = {
  md: 'size-8',
  sm: 'size-6',
  xs: 'size-5',
};

const textSizeClasses: Record<ChipSize, string> = {
  md: 'text-sm',
  sm: 'text-sm',
  xs: 'text-xs',
};

export default function Chip({
  label,
  'aria-hidden': ariaHidden,
  icon: Icon,
  variant,
  isLabelHidden,
  size = 'md',
  className,
  iconClassName,
}: Props) {
  const { backgroundClass, borderClass, textClass, iconClass } =
    variantClasses[variant];

  return (
    <span
      aria-hidden={ariaHidden}
      aria-label={isLabelHidden ? label : undefined}
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full py-px',
        'whitespace-nowrap font-medium',
        'shrink-0',
        sizeClasses[size],
        backgroundClass,
        borderClass,
        className,
      )}>
      {Icon && <Icon className={clsx(iconClass, 'size-3', iconClassName)} />}
      {!isLabelHidden && (
        <span className={clsx(textClass, textSizeClasses[size])}>{label}</span>
      )}
    </span>
  );
}
