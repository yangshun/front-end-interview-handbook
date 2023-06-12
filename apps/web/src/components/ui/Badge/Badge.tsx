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
    backgroundClass: 'bg-danger-lightest dark:bg-danger-darker',
    borderClass: 'border-danger',
    textClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lightest dark:bg-info-darker',
    borderClass: 'border-info dark:border-info-light',
    textClass: 'text-info dark:text-info-light',
  },
  primary: {
    backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
    borderClass: 'border-brand-dark dark:border-brand',
    textClass: 'text-brand-dark dark:text-brand',
  },
  special: {
    backgroundClass: 'bg-gradient-to-r from-pink-500 to-brand-dark',
    borderClass: 'border-white',
    textClass: 'text-white',
  },
  success: {
    backgroundClass: 'bg-success-lightest dark:bg-success-darker',
    borderClass: 'border-success dark:border-success-light',
    textClass: 'text-success dark:text-success-light',
  },
  warning: {
    backgroundClass: 'bg-warning-lightest dark:bg-warning-darker',
    borderClass: 'border-warning dark:border-warning-light',
    textClass: 'text-warning dark:text-warning-light',
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
