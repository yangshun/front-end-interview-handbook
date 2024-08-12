import clsx from 'clsx';

const sizeClasses = {
  sm: clsx('h-5', 'py px-[5px]', 'text-xs'),
  md: clsx('h-6', 'py px-[7px]', 'text-sm'),
  lg: clsx('h-7', 'py-[3px] px-[9px]', 'text-sm'),
};

const variantClasses = {
  neutral: clsx('bg-gray-50', 'border-neutral-200', 'text-neutral-600'),
  danger: clsx('bg-red-50', 'border-red-200', 'text-red-600'),
  warning: clsx('bg-amber-50', 'border-amber-200', 'text-amber-700'),
  success: clsx('bg-green-50', 'border-green-200', 'text-green-700'),
  brand: clsx('bg-indigo-50', 'border-indigo-200', 'text-indigo-700'),
};

const Badge = ({ label, size = 'md', variant = 'neutral', className }) => {
  const commonClasses = clsx('rounded-full text-center border');
  return (
    <div
      className={clsx(
        commonClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}>
      {label}
    </div>
  );
};

export default Badge;
