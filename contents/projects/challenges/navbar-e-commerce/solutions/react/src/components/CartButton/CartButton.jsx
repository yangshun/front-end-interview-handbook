import clsx from 'clsx';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';

const CartButton = ({ disabled, count }) => {
  return (
    <RouterLink
      aria-label="Cart button"
      className={clsx(
        'relative rounded text-neutral-600',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        {
          'pointer-events-none text-neutral-400': disabled,
        },
      )}>
      <RiShoppingBag3Line className="size-6" aria-hidden="true" />

      {count > 0 && (
        <div
          className={clsx(
            'absolute -right-1.5 -top-1.5 h-[18px] w-[18px] rounded-full text-center text-xs font-semibold',
            'flex items-center justify-center',
            {
              'bg-indigo-700 text-white': !disabled,
              'bg-neutral-100 text-neutral-400': disabled,
            },
          )}>
          {count}
        </div>
      )}
    </RouterLink>
  );
};

export default CartButton;
