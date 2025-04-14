import clsx from 'clsx';

import Badge from 'src/components/ui/Badge';

const OrderAmountSummary = ({
  subtotal,
  discountCode,
  discountAmount,
  discountPercentage,
  className,
  type = 'cart',
}) => {
  const isCartView = type === 'cart';

  return (
    <dl className={clsx('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-neutral-600">Subtotal</span>
        <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-neutral-600">Shipping</span>
        <span className="text-lg font-semibold">FREE</span>
      </div>
      {discountCode && (
        <div className="flex justify-between gap-2 md:items-center">
          <div
            className={clsx(
              'flex flex-col items-center md:flex-row',
              isCartView ? 'gap-x-8 gap-y-2' : 'gap-4',
            )}>
            <span className="text-neutral-600">Coupon discount</span>
            <Badge label={discountCode} variant="brand" size="lg" />
          </div>
          <span className="text-lg font-semibold">
            -
            {discountAmount
              ? `$${discountAmount.toFixed(2)}`
              : `${discountPercentage}%`}
          </span>
        </div>
      )}
    </dl>
  );
};

export default OrderAmountSummary;
