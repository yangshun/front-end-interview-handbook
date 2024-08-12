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
      <div className="flex items-center gap-2 justify-between">
        <span className="text-neutral-600">Subtotal</span>
        <span className="font-semibold text-lg">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-2 justify-between">
        <span className="text-neutral-600">Shipping</span>
        <span className="font-semibold text-lg">FREE</span>
      </div>
      {discountCode && (
        <div className="flex gap-2 justify-between md:items-center">
          <div
            className={clsx(
              'flex items-center flex-col md:flex-row',
              isCartView ? 'gap-x-8 gap-y-2' : 'gap-4'
            )}>
            <span className="text-neutral-600">Coupon discount</span>
            <Badge label={discountCode} variant="brand" size="lg" />
          </div>
          <span className="font-semibold text-lg">
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
