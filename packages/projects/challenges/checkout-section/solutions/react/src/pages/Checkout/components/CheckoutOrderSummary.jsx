import clsx from 'clsx';
import { useMemo } from 'react';
import { RiLockLine } from 'react-icons/ri';

import Badge from 'src/components/ui/Badge';
import Button from 'src/components/ui/Button';

import { useCartContext } from 'src/context/CartContext';

import { COLORS, SIZE } from 'src/constants';
import { formatPrice, getFinalAmount, getSubtotal } from 'src/pages/Cart/utils';

const CheckoutOrderSummary = ({ className }) => {
  const { cartItems, discount, checkingStock } = useCartContext();

  const subtotal = useMemo(() => getSubtotal(cartItems), [cartItems]);
  const finalAmount = useMemo(
    () => getFinalAmount(subtotal, discount),
    [subtotal, discount]
  );

  return (
    <section
      aria-describedby="checkout-form"
      className={clsx(
        'rounded-lg',
        'border border-neutral-200',
        'p-[15px] md:p-[31px]',
        'flex flex-col gap-8',
        className
      )}>
      <h3 className="font-semibold text-xl">Order Summary</h3>
      <div
        className={clsx('divide-y divide-neutral-300', 'flex flex-col flex-1')}>
        <ul
          className={clsx('divide-y divide-dashed divide-neutral-300', 'pb-8')}>
          {cartItems.map(item => {
            const {
              unit,
              quantity,
              product,
              total_list_price,
              total_sale_price,
            } = item;
            const hasDiscount =
              !!total_sale_price && total_sale_price !== total_list_price;

            return (
              <li
                key={unit.sku}
                className={clsx(
                  'flex gap-6 flex-col md:flex-row',
                  'py-8 first:pt-0 last:pb-0'
                )}>
                <div className="flex gap-6 flex-1">
                  <img
                    src={unit.image_url}
                    className="size-14 md:size-20 rounded-lg object-cover"
                    alt={`${SIZE[unit.size]?.long ?? unit.size} ${
                      product.name
                    } in ${unit.color}`}
                  />
                  <div className={clsx('flex flex-col gap-2', 'font-medium')}>
                    <span className="md:text-xl">{product.name}</span>
                    <span className="text-neutral-600">
                      {COLORS[unit.color].label}
                      {unit.size && (
                        <>
                          {' • '}
                          {SIZE[unit.size]?.long ?? unit.size}
                        </>
                      )}
                    </span>
                    <span className="text-neutral-600">
                      Quantity: {quantity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-semibold text-lg">
                    $
                    {hasDiscount
                      ? formatPrice(total_sale_price)
                      : formatPrice(total_list_price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg line-through  text-neutral-600">
                      ${formatPrice(total_list_price)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <dl
          className={clsx(
            'py-8',
            'flex flex-col gap-4 lg:flex-1',
            'h-full md:h-[247px] lg:h-full'
          )}>
          <div className="flex items-center gap-2 justify-between">
            <span className="text-neutral-600">Subtotal</span>
            <span className="font-semibold text-lg">${subtotal}</span>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <span className="text-neutral-600">Shipping</span>
            <span className="font-semibold text-lg">FREE</span>
          </div>
          {discount && (
            <div className="flex gap-2 justify-between md:items-center">
              <div className="flex items-center flex-col md:flex-row gap-x-8 gap-y-2">
                <span className="text-neutral-600">Coupon discount</span>
                <Badge label={discount.coupon_code} variant="brand" size="lg" />
              </div>
              <span className="font-semibold text-lg">
                -
                {discount.discount_amount
                  ? `$${discount.discount_amount.toFixed(2)}`
                  : `${discount.discount_percentage}%`}
              </span>
            </div>
          )}
        </dl>

        <div className={clsx('flex gap-4 justify-between', 'pt-8')}>
          <span className="font-medium text-2xl">Total</span>
          <span className="font-semibold text-4xl">${finalAmount}</span>
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
