import clsx from 'clsx';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';

import { useCartContext } from 'src/context/CartContext';

const CartButton = ({ disabled }) => {
  const { cartItems } = useCartContext();
  const count = cartItems.length;

  return (
    <RouterLink
      to="/cart"
      aria-label="Cart button"
      className={clsx(
        'text-neutral-600 rounded relative',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]',
        {
          'pointer-events-none text-neutral-400': disabled,
        }
      )}>
      <RiShoppingBag3Line className="size-6" aria-hidden="true" />

      {count > 0 && (
        <div
          className={clsx(
            'absolute -top-1.5 -right-1.5 rounded-full text-xs text-center font-semibold h-[18px] w-[18px]',
            'flex items-center justify-center',
            {
              'bg-indigo-700 text-white': !disabled,
              'bg-neutral-100 text-neutral-400': disabled,
            }
          )}>
          {count}
        </div>
      )}
    </RouterLink>
  );
};

export default CartButton;
