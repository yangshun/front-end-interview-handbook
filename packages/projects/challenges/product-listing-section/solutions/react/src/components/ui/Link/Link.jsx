import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

const linkVariantClasses = {
  primary: clsx(
    'text-indigo-700',
    'hover:text-indigo-800 focus:text-indigo-800',
    'rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
    'px-0.5'
  ),
  gray: clsx(
    'text-neutral-600',
    'hover:text-neutral-900 focus:text-neutral-900',
    'rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
    'px-0.5'
  ),
  unstyled: '',
};

const Link = ({
  children,
  disabled,
  className,
  variant = 'primary',
  ...props
}) => {
  return (
    <RouterLink
      {...props}
      className={clsx(
        'font-medium rounded',
        linkVariantClasses[variant],
        {
          'pointer-events-none text-neutral-400': disabled,
        },
        className
      )}>
      {children}
    </RouterLink>
  );
};

export default Link;
