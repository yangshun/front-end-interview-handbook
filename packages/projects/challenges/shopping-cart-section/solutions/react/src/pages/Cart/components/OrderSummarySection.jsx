import { useMemo } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

import Button from 'src/components/ui/Button';
import CouponCode from './CouponCode';
import StockChangedModal from './StockChangedModal';

import { useCartContext } from 'src/context/CartContext';

import { getFinalAmount, getSubtotal } from '../utils';

const OrderSummarySection = ({ className }) => {
  const isMobileAndBelow = useMediaQuery('(max-width: 767px)');
  const { cartItems, discount, checkingStock } = useCartContext();

  const subtotal = useMemo(() => getSubtotal(cartItems), [cartItems]);
  const finalAmount = useMemo(
    () => getFinalAmount(subtotal, discount),
    [subtotal, discount]
  );

  return (
    <section
      aria-describedby="cart-summary"
      className={clsx(
        'flex flex-col gap-8',
        'w-full h-fit',
        'bg-white',
        'p-[15px] md:p-[31px] rounded-lg',
        'border border-neutral-200',
        className
      )}>
      <h2 className="font-semibold text-2xl text-neutral-900">Order Summary</h2>

      <div
        className={clsx(
          'flex flex-col',
          'divide-y divide-dashed divide-neutral-300'
        )}>
        <dl className={clsx('flex flex-col gap-4', 'pb-[31.5px]')}>
          <div className="flex items-center gap-2 justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-semibold text-lg">${subtotal}</span>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <span className="text-neutral-600">Shipping</span>
            <span className="font-semibold text-lg">FREE</span>
          </div>

          <CouponCode />
        </dl>

        <div className={clsx('flex flex-col gap-8', 'pt-[31.5px]')}>
          <div className="flex gap-4 justify-between">
            <span className="font-medium text-2xl">Total</span>
            <span className="font-semibold text-4xl">${finalAmount}</span>
          </div>
          <Button
            type="submit"
            label="Checkout"
            isDisabled={checkingStock}
            size={isMobileAndBelow ? 'xl' : '2xl'}
          />
        </div>
      </div>

      <StockChangedModal />
    </section>
  );
};

export default OrderSummarySection;
