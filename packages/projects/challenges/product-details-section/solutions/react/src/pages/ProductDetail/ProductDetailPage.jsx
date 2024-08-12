import clsx from 'clsx';

import ProductDetail from './components/ProductDetail';
import ProductDetailsContextProvider from './components/ProductDetailsContext';

const ProductDetailPage = () => {
  return (
    <main className="mx-auto min-h-screen max-w-[1440px] p-4">
      <div
        className={clsx(
          'min-h-[calc(100vh_-_32px)] rounded-md bg-white',
          'shadow-sm md:shadow-md lg:shadow-lg',
        )}>
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
      </div>
    </main>
  );
};

export default ProductDetailPage;
