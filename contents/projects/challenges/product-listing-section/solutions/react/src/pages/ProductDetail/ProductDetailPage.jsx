import clsx from 'clsx';

import ProductDetail from './components/ProductDetail';
import ProductDetailsContextProvider from './components/ProductDetailsContext';

const ProductDetailPage = () => {
  return (
    <ProductDetailsContextProvider>
      <div
        className={clsx(
          'w-full',
          'px-4 py-12 md:py-16 lg:p-24',
          'grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12',
        )}>
        <ProductDetail />
      </div>
    </ProductDetailsContextProvider>
  );
};

export default ProductDetailPage;
