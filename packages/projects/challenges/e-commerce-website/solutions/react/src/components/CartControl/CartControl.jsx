import clsx from 'clsx';
import { RiAddFill, RiSubtractFill } from 'react-icons/ri';

import Tooltip from '../ui/Tooltip';

const CartControl = ({ quantity, decrement, increment, availableStock }) => {
  const disabledDecrement = quantity === 1;
  const disabledIncrement = quantity >= availableStock;

  return (
    <div
      className={clsx(
        'w-[125px] h-9',
        'flex justify-center items-center gap-3',
        'py-0.5 px-[5px]',
        'bg-neutral-50 rounded-md border border-neutral-200'
      )}
      role="group"
      aria-label="Product Quantity control">
      <button
        type="button"
        className={clsx(
          'flex justify-center items-center rounded',
          'text-neutral-600 disabled:text-neutral-400',
          'cursor-pointer disabled:pointer-events-none'
        )}
        disabled={disabledDecrement}
        onClick={decrement}
        aria-label="Decrease quantity">
        <RiSubtractFill className="size-5 p-0.5 shrink-0" />
      </button>
      <span
        className="flex-1 text-center font-medium text-sm text-neutral-600"
        aria-live="polite">
        {quantity}
      </span>
      <Tooltip content="Insufficient stock" show={disabledIncrement}>
        <button
          type="button"
          className={clsx(
            'flex justify-center items-center rounded',
            'text-neutral-600 disabled:text-neutral-400',
            'cursor-pointer disabled:pointer-events-none'
          )}
          disabled={disabledIncrement}
          onClick={increment}
          aria-label="Increase quantity">
          <RiAddFill className="size-5 p-0.5 shrink-0" />
        </button>
      </Tooltip>
    </div>
  );
};

export default CartControl;
