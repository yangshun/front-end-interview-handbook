import clsx from 'clsx';
import { useMemo } from 'react';

import { useProductDetailsContext } from './ProductDetailsContext';
import { getUnavailableSizes } from '../utils';

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
    [product, selectedColor]
  );

  return (
    <fieldset aria-label="Choose a size">
      <legend className="text-sm text-neutral-500">Available Sizes</legend>

      <div className={clsx('mt-4', 'flex gap-4 flex-wrap')}>
        {sizes.map(size => {
          const outOfStock = unavailableSizes.includes(size);

          return (
            <label
              key={size}
              aria-label={size}
              className={clsx(
                outOfStock ? 'pointer-events-none' : 'cursor-pointer'
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
                  'w-16 h-12',
                  'flex justify-center items-center gap-1.5',
                  'px-5 py-3',
                  'uppercase font-medium',
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
                        'bg-white focus:bg-neutral-50 hover:bg-neutral-50',
                      ],
                  selectedSize === size
                    ? 'border-indigo-600'
                    : 'border-neutral-200',
                  outOfStock && selectedSize !== size && 'border-none'
                )}
                onKeyDown={e => {
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
