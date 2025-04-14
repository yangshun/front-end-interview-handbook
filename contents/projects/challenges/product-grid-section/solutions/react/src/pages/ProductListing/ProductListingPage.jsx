import clsx from 'clsx';

import Filter from './components/Filter';
import ProductListingContextProvider from './components/ProductListingContext';
import ProductListingSection from './components/ProductListingSection';
import SortByFilter from './components/SortByFilter';

const ProductListingPage = () => {
  return (
    <ProductListingContextProvider>
      <div
        className={clsx(
          'w-full',
          'px-4 py-12 md:py-[72px] lg:px-24 lg:py-[104px]',
          'grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-x-8 lg:grid-cols-12',
        )}>
        <div
          className={clsx(
            'col-span-4 md:col-span-6 lg:col-span-3 lg:pr-12 lg:pt-4',
            'flex justify-between',
          )}>
          <Filter />
          <div className="block lg:hidden">
            <SortByFilter />
          </div>
        </div>

        <div
          className={clsx(
            'col-span-4 md:col-span-6  lg:col-span-9',
            'flex flex-col items-end gap-8',
          )}>
          <div className="hidden lg:block">
            <SortByFilter />
          </div>

          <div
            className={clsx(
              'h-full w-full',
              'grid grid-cols-4 gap-8 md:grid-cols-6 lg:grid-cols-9',
            )}>
            <ProductListingSection />
          </div>
        </div>
      </div>
    </ProductListingContextProvider>
  );
};

export default ProductListingPage;
