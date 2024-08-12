import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Link from 'src/components/ui/Link';
import ColorSwatches from 'src/components/ui/ColorSwatches';

import { COLORS } from 'src/constants';

import { getUnavailableColors } from 'src/pages/ProductDetail/utils';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { images, name, inventory, colors } = product;
  const { discount_percentage, sale_price, list_price, color } = inventory[0];

  const hasDiscount = !!discount_percentage;

  const unavailableColors = useMemo(
    () => getUnavailableColors(product),
    [product]
  );

  const redirectUrl = `/products/${product.product_id}`;

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        navigate(redirectUrl);
      }
    },
    [navigate, redirectUrl]
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={clsx(
        'w-full relative',
        'group',
        'flex flex-col gap-4',
        'rounded-lg',
        'outline-none',
        'focus:ring-4 focus:ring-indigo-600/[.12]'
      )}>
      <img
        src={images[0].image_url}
        alt={`${name}'s product preview`}
        loading="lazy"
        className={clsx(
          'h-[225px] md:h-[300px] w-full object-cover rounded-lg'
        )}
      />
      <div className={clsx('flex flex-col', 'min-h-[152px]')}>
        <span className="text-xs text-neutral-600 mb-0.5">
          {COLORS[color]?.label}
        </span>
        <Link
          to={redirectUrl}
          tabIndex={-1}
          variant="unstyled"
          className={clsx(
            'font-medium text-lg text-neutral-900',
            'group-hover:text-indigo-700'
          )}>
          <span aria-hidden={true} className="absolute inset-0" />
          {name}
        </Link>
        <div className="flex gap-2 items-center mt-3">
          <span className="text-lg text-neutral-500">
            ${hasDiscount ? sale_price : list_price}
          </span>
          {hasDiscount && (
            <span className="text-xs line-through text-neutral-600">
              ${list_price}
            </span>
          )}
        </div>
        <div className="flex gap-1 flex-wrap mt-3">
          {colors.map(color => (
            <ColorSwatches
              key={color}
              color={COLORS[color].value}
              size="sm"
              outOfStock={unavailableColors.includes(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
