import clsx from 'clsx';

export type ChipSize = 'md' | 'sm';

export type ChipVariant =
  | 'active'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'special'
  | 'success';

type Props = Readonly<
  {
    'aria-hidden'?: boolean;
    className?: string;
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
  primary: {
    backgroundClass: 'bg-brand-dark dark:bg-brand',
    borderClass: '',
    iconClass: 'text-white',
    textClass: 'text-white',
  },
  secondary: {
    backgroundClass: 'bg-brand-lightest dark:bg-neutral-800',
    borderClass: 'border border-dashed border-brand-dark dark:border-brand',
    iconClass: 'text-brand-dark dark:text-brand',
    textClass: 'text-brand-dark dark:text-brand',
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
};

const sizeClasses: Record<ChipSize, string> = {
  md: 'h-8 w-8',
  sm: 'h-6 w-6',
};

export default function Chip({
  label,
  'aria-hidden': ariaHidden,
  icon: Icon,
  variant,
  isLabelHidden,
  size = 'md',
  className,
}: Props) {
  const { backgroundClass, borderClass, textClass, iconClass } =
    variantClasses[variant];

  return (
    <span
      aria-hidden={ariaHidden}
      aria-label={isLabelHidden ? label : undefined}
      className={clsx(
        'relative inline-flex items-center justify-center whitespace-nowrap rounded-full py-px font-medium',
        sizeClasses[size],
        backgroundClass,
        borderClass,
        className,
      )}>
      {Icon && <Icon className={clsx(iconClass, 'h-4 w-4')} />}
      {!isLabelHidden && <span className={textClass}>{label}</span>}
    </span>
  );
}
