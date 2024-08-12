import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Button from 'src/components/ui/Button';
import ProductGridSection from 'src/components/ProductGridSection';

const LatestArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const getLatestArrivalProducts = async () => {
    setIsProductsLoading(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest`,
    );
    const result = await data.json();

    if (!result.error) {
      setProducts(result.data);
    }
    setIsProductsLoading(false);
  };

  useEffect(() => {
    getLatestArrivalProducts();
  }, []);

  return (
    <div
      className={clsx(
        'px-4 py-12 md:py-[72px] lg:px-24 lg:py-[104px]',
        'flex flex-col gap-8',
        'h-full',
      )}>
      <div className="flex items-center justify-between md:items-start">
        <div className="text-2xl font-semibold md:text-3xl">
          Latest Arrivals
        </div>
        <Button
          label="View all"
          variant="secondary"
          href="/products?collectionId=latest"
          size="lg"
        />
      </div>
      {isProductsLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : (
        <ProductGridSection products={products} />
      )}
    </div>
  );
};

export default LatestArrivalsPage;
