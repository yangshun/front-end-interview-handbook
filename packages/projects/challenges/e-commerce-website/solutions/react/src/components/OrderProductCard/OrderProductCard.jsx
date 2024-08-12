import clsx from 'clsx';

import { COLORS, SIZE } from 'src/constants';
import { formatPrice } from 'src/utils';

const OrderProductCard = ({ data, type = 'cart' }) => {
  const { unit, quantity, product, total_list_price, total_sale_price } = data;
  const hasDiscount =
    !!total_sale_price && total_sale_price !== total_list_price;

  const isCartView = type === 'cart';

  return (
    <div className={clsx('flex gap-6', isCartView && 'flex-col md:flex-row')}>
      <div className="flex flex-1 gap-6">
        <img
          src={unit.image_url}
          className={clsx(
            'shrink-0 rounded-lg object-cover',
            isCartView ? 'size-14 md:size-20' : 'size-20',
          )}
          alt={`${SIZE[unit.size]?.long ?? unit.size} ${product.name} in ${
            unit.color
          }`}
        />
        <div className={clsx('flex flex-col gap-2', 'font-medium')}>
          <span className={clsx(isCartView ? 'md:text-xl' : 'text-xl')}>
            {product.name}
          </span>
          <span className="text-neutral-600">
            {COLORS[unit.color].label}
            {unit.size && (
              <>
                {' • '}
                {SIZE[unit.size]?.long ?? unit.size}
              </>
            )}
          </span>
          <span className="text-neutral-600">Quantity: {quantity}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-semibold">
          $
          {hasDiscount
            ? formatPrice(total_sale_price)
            : formatPrice(total_list_price)}
        </span>
        {hasDiscount && (
          <span className="text-lg text-neutral-600  line-through">
            ${formatPrice(total_list_price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderProductCard;
