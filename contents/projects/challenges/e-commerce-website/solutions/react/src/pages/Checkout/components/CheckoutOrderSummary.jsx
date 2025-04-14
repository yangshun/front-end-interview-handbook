import clsx from 'clsx';
import { useMemo } from 'react';
import { RiLockLine } from 'react-icons/ri';

import Button from 'src/components/ui/Button';
import OrderProductCard from 'src/components/OrderProductCard';
import OrderAmountSummary from 'src/components/OrderAmountSummary';

import { useCartContext } from 'src/context/CartContext';

import { getFinalAmount, getSubtotal } from 'src/utils';

const CheckoutOrderSummary = ({ className }) => {
  const { cartItems, discount, checkingStock } = useCartContext();

  const subtotal = useMemo(() => getSubtotal(cartItems), [cartItems]);
  const finalAmount = useMemo(
    () => getFinalAmount(subtotal, discount),
    [subtotal, discount],
  );

  return (
    <section
      aria-describedby="checkout-form"
      className={clsx(
        'rounded-lg',
        'border border-neutral-200',
        'p-[15px] md:p-[31px]',
        'flex flex-col gap-8',
        className,
      )}>
      <h3 className="text-xl font-semibold">Order Summary</h3>
      <div
        className={clsx('divide-y divide-neutral-300', 'flex flex-1 flex-col')}>
        <ul
          className={clsx('divide-y divide-dashed divide-neutral-300', 'pb-8')}>
          {cartItems.map((item) => (
            <li
              key={item.unit.sku}
              className={clsx('py-8 first:pt-0 last:pb-0')}>
              <OrderProductCard data={item} />
            </li>
          ))}
        </ul>

        <OrderAmountSummary
          subtotal={subtotal}
          discountCode={discount?.coupon_code}
          discountAmount={discount?.discount_amount?.toFixed(2)}
          discountPercentage={discount?.discount_percentage}
          className={clsx('py-8', 'lg:flex-1', 'h-full md:h-[247px] lg:h-full')}
        />

        <div className={clsx('flex justify-between gap-4', 'pt-8')}>
          <span className="text-2xl font-medium">Total</span>
          <span className="text-4xl font-semibold">${finalAmount}</span>
        </div>
      </div>

      <Button
        type="submit"
        label="Confirm order"
        size="xl"
        isDisabled={checkingStock}
        startIcon={RiLockLine}
      />
    </section>
  );
};

export default CheckoutOrderSummary;
