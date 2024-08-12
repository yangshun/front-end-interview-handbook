import clsx from 'clsx';

import { useProductDetailsContext } from './ProductDetailsContext';
import { getUnavailableSizes } from '../utils';
import { useMemo } from 'react';

const SIZE_MAP = {
  xs: 'XS',
  sm: 'S',
  md: 'M',
  lg: 'L',
  xl: 'XL',
};

const AvailableSizes = () => {
  const { selectedSize, setSelectedSize, selectedColor, product } =
    useProductDetailsContext();
  const { sizes } = product;
  const unavailableSizes = useMemo(
    () =>
      getUnavailableSizes({
        product,
        color: selectedColor,
      }),
    [product, selectedColor],
  );

  return (
    <fieldset aria-label="Choose a size">
      <legend className="text-sm text-neutral-500">Available Sizes</legend>

      <div className={clsx('mt-4', 'flex flex-wrap gap-4')}>
        {sizes.map((size) => {
          const outOfStock = unavailableSizes.includes(size);

          return (
            <label
              key={size}
              aria-label={size}
              className={clsx(
                outOfStock ? 'pointer-events-none' : 'cursor-pointer',
              )}>
              <input
                type="radio"
                name="size-choice"
                value={size}
                className="sr-only"
                disabled={outOfStock}
                tabIndex={-1}
                aria-checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
              />
              <span
                aria-hidden="true"
                tabIndex={selectedSize === size || outOfStock ? -1 : 0}
                className={clsx(
                  'h-12 w-16',
                  'flex items-center justify-center gap-1.5',
                  'px-5 py-3',
                  'font-medium uppercase',
                  'rounded border',
                  'focus:outline-none',
                  outOfStock
                    ? [
                        'text-neutral-400',
                        'pointer-events-none',
                        'bg-neutral-100',
                      ]
                    : [
                        'text-neutral-900',
                        'cursor-pointer',
                        'bg-white hover:bg-neutral-50 focus:bg-neutral-50',
                      ],
                  selectedSize === size
                    ? 'border-indigo-600'
                    : 'border-neutral-200',
                  outOfStock && selectedSize !== size && 'border-none',
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedSize(size);
                  }
                }}>
                {SIZE_MAP[size]}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default AvailableSizes;
