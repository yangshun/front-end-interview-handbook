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
    textClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-rose-100',
    textClass: 'text-rose-800',
  },
  info: {
    backgroundClass: 'bg-sky-100',
    textClass: 'text-sky-800',
  },
  primary: {
    backgroundClass: 'bg-brand-100',
    textClass: 'text-brand-800',
  },
  special: {
    backgroundClass: 'bg-gradient-to-r from-pink-500 to-brand-600',
    textClass: 'text-white',
  },
  success: {
    backgroundClass: 'bg-emerald-100',
    textClass: 'text-emerald-800',
  },
  warning: {
    backgroundClass: 'bg-amber-100',
    textClass: 'text-amber-800',
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  md: 'px-3 py-1 text-xs',
  sm: 'px-2 py-0.5 text-2xs',
};

export default function Badge({ label, size = 'md', variant }: Props) {
  const { backgroundClass, textClass } = variantClasses[variant];

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        backgroundClass,
        textClass,
      )}>
      {label}
    </span>
  );
}
