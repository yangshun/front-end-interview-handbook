import clsx from 'clsx';
import { NavLink, Link as RouterLink } from 'react-router-dom';

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

const activeLinkClasses = {
  primary: 'text-indigo-800',
  gray: 'text-neutral-900',
  unstyled: '',
};

const Link = ({
  children,
  disabled,
  className,
  type = 'default',
  variant = 'primary',
  ...props
}) => {
  const commonClassName = clsx(
    'font-medium rounded',
    linkVariantClasses[variant],
    {
      'pointer-events-none text-neutral-400': disabled,
    },
    className
  );

  if (type === 'nav') {
    return (
      <NavLink
        {...props}
        className={({ isActive }) =>
          clsx(commonClassName, isActive && activeLinkClasses[variant])
        }>
        {children}
      </NavLink>
    );
  }
  return (
    <RouterLink {...props} className={clsx(commonClassName)}>
      {children}
    </RouterLink>
  );
};

export default Link;
