import clsx from 'clsx';

import ProductImages from './ProductImages';
import ProductMetadata from './ProductMetadata';

import { useProductDetailsContext } from './ProductDetailsContext';

const ProductDetail = () => {
  const { isProductLoading, product } = useProductDetailsContext();

  return (
    <section
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12',
      )}>
      {isProductLoading || !product ? (
        <div
          className={clsx(
            'flex h-full w-full items-center justify-center',
            'col-span-4 md:col-span-6 lg:col-span-12',
          )}>
          Loading...
        </div>
      ) : (
        <>
          <div className="col-span-4 md:col-span-6">
            <ProductImages />
          </div>
          <div className="col-span-4 md:col-span-6">
            <ProductMetadata />
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetail;
