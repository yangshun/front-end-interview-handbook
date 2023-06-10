import clsx from 'clsx';

type BadgeVariant =
  | 'danger'
  | 'info'
  | 'primary'
  | 'special'
  | 'success'
  | 'warning';
type BadgeSize = 'md' | 'sm';

type Props = Readonly<{
  label: string;
  size?: BadgeSize;
  variant: BadgeVariant;
}>;

const variantClasses: Record<
  BadgeVariant,
  Readonly<{
    backgroundClass: string;
    borderClass: string;
    textClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lighter dark:bg-danger-darker',
    borderClass: 'border-danger dark:border-danger-lighter',
    textClass: 'text-danger dark:text-danger-lighter',
  },
  info: {
    backgroundClass: 'bg-info-lighter dark:bg-info-darker',
    borderClass: 'border-info dark:border-info-lighter',
    textClass: 'text-info dark:text-info-lighter',
  },
  primary: {
    backgroundClass: 'bg-brand-100',
    borderClass: 'border-brand-800',
    textClass: 'text-brand-800',
  },
  special: {
    backgroundClass: 'bg-gradient-to-r from-pink-500 to-brand-600',
    borderClass: 'border-white',
    textClass: 'text-white',
  },
  success: {
    backgroundClass: 'bg-success-lighter dark:bg-success-darker',
    borderClass: 'border-success dark:border-success-light',
    textClass: 'text-success dark:text-success-light',
  },
  warning: {
    backgroundClass: 'bg-warning-lighter dark:bg-warning-darker',
    borderClass: 'border-warning-dark dark:border-warning-light',
    textClass: 'text-warning-dark dark:text-warning-light',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  md: 'px-3 text-sm',
  sm: 'px-2 text-xs',
};

export default function Badge({ label, size = 'md', variant }: Props) {
  const { backgroundClass, borderClass, textClass } = variantClasses[variant];

  return (
    <span
      className={clsx(
        'inline-flex items-center whitespace-nowrap rounded-full border py-0.5 font-medium',
        sizeClasses[size],
        backgroundClass,
        borderClass,
        textClass,
      )}>
      {label}
    </span>
  );
}
