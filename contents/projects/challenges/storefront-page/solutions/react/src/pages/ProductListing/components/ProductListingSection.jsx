import { RiTShirt2Line } from 'react-icons/ri';
import clsx from 'clsx';

import ProductCard from 'src/components/ProductCard';
import Button from 'src/components/ui/Button';

import { useProductListingContext } from './ProductListingContext';

const ProductListingSection = () => {
  const { products, isProductsLoading, filterCount, resetFilters } =
    useProductListingContext();

  if (isProductsLoading) {
    return (
      <div
        className={clsx(
          'col-span-4 md:col-span-6 lg:col-span-9',
          'flex justify-center',
        )}>
        Loading...
      </div>
    );
  }

  if (filterCount > 0 && products.length === 0) {
    return (
      <div
        className={clsx(
          'h-full w-full',
          'col-span-4 md:col-span-6 lg:col-span-9',
          'flex flex-col items-center justify-center gap-5',
        )}>
        <div
          className={clsx(
            'size-12 rounded-full bg-white shadow',
            'flex items-center justify-center',
          )}>
          <RiTShirt2Line className="size-6 text-indigo-700" />
        </div>
        <div
          className={clsx(
            'flex flex-col items-center gap-2',
            'text-center text-neutral-900',
          )}>
          <span className="text-xl font-medium">Nothing found just yet</span>
          <span>
            Adjust your filters a bit, and let's see what we can find!
          </span>
        </div>
        <Button label="Reset filters" size="lg" onClick={resetFilters} />
      </div>
    );
  }

  return products.map((product) => (
    <div key={product.product_id} className={clsx('col-span-4 md:col-span-3')}>
      <ProductCard product={product} />
    </div>
  ));
};

export default ProductListingSection;
