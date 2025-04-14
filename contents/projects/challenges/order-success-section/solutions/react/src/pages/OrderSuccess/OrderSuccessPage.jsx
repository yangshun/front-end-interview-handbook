import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { RiArrowRightLine, RiFileCopy2Line } from 'react-icons/ri';

import OrderAmountSummary from 'src/components/OrderAmountSummary';
import OrderProductCard from 'src/components/OrderProductCard';

import Button from 'src/components/ui/Button';
import { Visa } from '../Checkout/components/PaymentCard';
import { formatInternationalPhoneNumber } from 'src/utils';

const OrderSuccessPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const getOrder = useCallback(async () => {
    setIsFetching(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/order-sample`,
    );
    const result = await data.json();
    if (!result.error) {
      setOrderData(result);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <div
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12',
        'gap-x-4 gap-y-12 md:gap-x-8',
      )}>
      {isFetching ? (
        <div>Loading....</div>
      ) : (
        <>
          <img
            src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/order-success-desktop.jpg"
            alt="Order success banner"
            className={clsx('hidden lg:block', 'col-span-6', 'h-full w-full')}
          />
          <img
            src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/order-success-tablet.jpg"
            alt="Order success banner"
            className={clsx(
              'hidden md:block lg:hidden',
              'col-span-6',
              'h-full w-full',
            )}
          />
          <img
            src="https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/e-commerce-track-images/order-success-mobile.jpg"
            alt="Order success banner"
            className={clsx(
              'block md:hidden',
              'col-span-4 md:col-span-6',
              'h-[196px] w-full',
            )}
          />
          <div
            className={clsx(
              'col-span-4 md:col-span-6',
              'flex flex-col gap-12',
            )}>
            <div className="flex flex-col justify-center gap-4">
              <h2 className="text-3xl font-semibold md:text-4xl">
                Your order is confirmed.
              </h2>
              <span className="text-neutral-600">
                Your order is now in the queue and being processed. We'll let
                you know when we ship it out!
              </span>
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-neutral-600">Order Number</span>
              <Button
                label={orderData.order_id}
                variant="link"
                size="lg"
                endIcon={RiFileCopy2Line}
                iconClassName="!p-0"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(orderData.order_id);
                  } catch (error) {
                    console.error('Copy failed', error);
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-8">
              <div
                className={clsx('divide-y divide-dashed divide-neutral-300')}>
                <ul
                  className={clsx(
                    'divide-y divide-dashed divide-neutral-300',
                    'pb-[31.5px]',
                  )}>
                  {orderData.items.map((item) => (
                    <li
                      key={item.unit.sku}
                      className={clsx('py-[31.5px] first:pt-0 last:pb-0')}>
                      <OrderProductCard data={item} type="order" />
                    </li>
                  ))}
                </ul>
                <OrderAmountSummary
                  subtotal={orderData.summary.subtotal}
                  discountCode={orderData.summary.discount_code}
                  discountAmount={orderData.summary.discount}
                  className={clsx('gap-6 py-[31.5px]')}
                  type="order"
                />

                <div
                  className={clsx('flex justify-between gap-4', 'pt-[31.5px]')}>
                  <span>Total</span>
                  <span className="text-2xl font-semibold">
                    ${orderData.summary.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-8 md:flex-row">
                <div
                  className={clsx(
                    'flex flex-col gap-4',
                    'flex-1',
                    'md:h-[164px]',
                    'text-neutral-600',
                  )}>
                  <span>Shipping address</span>
                  <div className={clsx('flex flex-col', 'text-sm')}>
                    <span>
                      {formatInternationalPhoneNumber(
                        orderData.shipping_details.phone,
                      )}
                    </span>
                    <span>{orderData.shipping_details.address.line1}</span>
                    {orderData.shipping_details.address.line2 && (
                      <span>{orderData.shipping_details.address.line2}</span>
                    )}
                    <span>
                      {orderData.shipping_details.address.city},{' '}
                      {orderData.shipping_details.address.state}{' '}
                      {orderData.shipping_details.address.zip}
                    </span>
                    <span>United States</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <span className="text-neutral-600">Payment</span>
                  <div className="flex items-center gap-4">
                    <Visa className="h-12 w-[70px]" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm">
                        Ending with {orderData.payment_method.last_4}
                      </span>
                      <span className="text-sm text-neutral-600">
                        Expires {orderData.payment_method.exp_month} /{' '}
                        {orderData.payment_method.exp_year.toString().slice(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              label="Continue Shopping"
              endIcon={RiArrowRightLine}
              href="/products"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSuccessPage;
