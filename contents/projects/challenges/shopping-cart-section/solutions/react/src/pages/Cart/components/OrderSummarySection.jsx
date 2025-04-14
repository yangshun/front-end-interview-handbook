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
    [subtotal, discount],
  );

  return (
    <section
      aria-describedby="cart-summary"
      className={clsx(
        'flex flex-col gap-8',
        'h-fit w-full',
        'bg-white',
        'rounded-lg p-[15px] md:p-[31px]',
        'border border-neutral-200',
        className,
      )}>
      <h2 className="text-2xl font-semibold text-neutral-900">Order Summary</h2>

      <div
        className={clsx(
          'flex flex-col',
          'divide-y divide-dashed divide-neutral-300',
        )}>
        <dl className={clsx('flex flex-col gap-4', 'pb-[31.5px]')}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-600">Subtotal</span>
            <span className="text-lg font-semibold">${subtotal}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-600">Shipping</span>
            <span className="text-lg font-semibold">FREE</span>
          </div>

          <CouponCode />
        </dl>

        <div className={clsx('flex flex-col gap-8', 'pt-[31.5px]')}>
          <div className="flex justify-between gap-4">
            <span className="text-2xl font-medium">Total</span>
            <span className="text-4xl font-semibold">${finalAmount}</span>
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
