import clsx from 'clsx';

import Link from 'src/components/ui/Link';

const paddingClasses = {
  md: 'px-3.5 py-2.5',
  lg: 'px-4 py-2.5',
  xl: 'px-5 py-3',
  '2xl': 'px-6 py-4',
};

// We need this because secondary button has border
const secondaryVariantPaddingClasses = {
  md: 'px-[13px] py-[9px]',
  lg: 'px-[15px] py-[9px]',
  xl: 'px-[19px] py-[11px]',
  '2xl': 'px-[23px] py-[15px]',
};

const fontSizeClasses = {
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-base',
  '2xl': 'text-lg',
};

const spacingClasses = {
  md: 'gap-x-1.5',
  lg: 'gap-x-2',
  xl: 'gap-x-2',
  '2xl': 'gap-x-3',
};

const heightClasses = {
  md: 'h-10',
  lg: 'h-11',
  xl: 'h-12',
  '2xl': 'h-15',
};

const iconOnlySizeClasses = {
  md: 'size-10',
  lg: 'size-11',
  xl: 'size-12',
  '2xl': 'size-14',
};

const iconSizeClasses = {
  md: 'size-5',
  lg: 'size-5',
  xl: 'size-5',
  '2xl': 'size-6',
};

const variantClasses = {
  primary: clsx(
    'border-none',
    'bg-indigo-700',
    'shadow-custom',
    'text-white',
    'hover:bg-indigo-800 focus:bg-indigo-800'
  ),
  secondary: clsx(
    'border border-neutral-200',
    'bg-white',
    'shadow-custom',
    'text-neutral-900',
    'hover:bg-neutral-50 focus:bg-neutral-50'
  ),
  tertiary: clsx(
    'border-none',
    'text-indigo-700',
    'hover:bg-neutral-50 focus:bg-neutral-50'
  ),
  danger: clsx(
    'border-none',
    'bg-red-600',
    'text-white',
    'hover:bg-red-700 focus:bg-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-600/[.12]'
  ),
  link: clsx(
    'text-indigo-700',
    'hover:text-indigo-800 focus:text-indigo-800',
    'rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]'
  ),
};

const variantDisabledClasses = {
  primary: clsx(
    'disabled:bg-neutral-100',
    'disabled:text-neutral-400',
    'disabled:shadow-none'
  ),
  secondary: clsx(
    'disabled:bg-neutral-100',
    'disabled:text-neutral-400',
    'disabled:shadow-none'
  ),
  tertiary: clsx('disabled:bg-none', 'disabled:text-neutral-400'),
  danger: clsx('disabled:bg-none', 'disabled:text-neutral-400'),
  link: clsx('disabled:text-neutral-400'),
};

const Button = ({
  label,
  className,
  isDisabled,
  startIcon: StartIcon,
  endIcon: EndIcon,
  isLabelHidden,
  size = 'md',
  variant = 'primary',
  iconClassName,
  href,
  ...props
}) => {
  const commonClasses = clsx(
    'inline-flex items-center justify-center rounded font-medium outline-none cursor-pointer',
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
    'transition-colors',
    'text-nowrap',
    variant !== 'link' && heightClasses[size],
    variant !== 'link' &&
      (variant === 'secondary'
        ? secondaryVariantPaddingClasses[size]
        : paddingClasses[size]),
    fontSizeClasses[size],
    spacingClasses[size],
    isLabelHidden && iconOnlySizeClasses[size],
    variantClasses[variant],
    variantDisabledClasses[variant],
    isDisabled && 'pointer-events-none'
  );

  if (href) {
    return (
      <Link
        to={href}
        variant={variant}
        disabled={isDisabled}
        className={clsx(commonClasses, className)}
        {...props}>
        {StartIcon && (
          <StartIcon
            className={clsx('size-5 p-0.5 shrink-0', iconClassName)}
            aria-hidden="true"
          />
        )}
        {label}
        {EndIcon && (
          <EndIcon
            className={clsx('size-5 p-0.5 shrink-0', iconClassName)}
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  const children = isLabelHidden ? (
    (
      <StartIcon
        className={clsx('shrink-0', iconSizeClasses[size], iconClassName)}
        aria-hidden="true"
      />
    ) || (
      <EndIcon
        className={clsx('shrink-0', iconSizeClasses[size], iconClassName)}
        aria-hidden="true"
      />
    )
  ) : (
    <>
      {StartIcon && (
        <StartIcon
          className={clsx('size-5 p-0.5 shrink-0', iconClassName)}
          aria-hidden="true"
        />
      )}
      {label}
      {EndIcon && (
        <EndIcon
          className={clsx('size-5 p-0.5 shrink-0', iconClassName)}
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <button
      className={clsx(commonClasses, className)}
      disabled={isDisabled}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
