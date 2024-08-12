import clsx from 'clsx';

import ProductDetailSection from './components/ProductDetailSection';
import ProductDetailsContextProvider from './components/ProductDetailsContext';

const ProductDetailPage = () => {
  return (
    <ProductDetailsContextProvider>
      <div
        className={clsx(
          'w-full',
          'px-4 py-12 md:py-16 lg:p-24',
          'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12'
        )}>
        <ProductDetailSection />
      </div>
    </ProductDetailsContextProvider>
  );
};

export default ProductDetailPage;
