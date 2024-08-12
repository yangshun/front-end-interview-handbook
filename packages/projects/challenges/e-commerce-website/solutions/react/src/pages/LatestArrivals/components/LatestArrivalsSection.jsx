import { useEffect, useState } from 'react';

import Button from 'src/components/ui/Button';
import ProductGridSection from 'src/components/ProductGridSection';
import clsx from 'clsx';

const LatestArrivalsSection = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);

  const getLatestArrivalProducts = async () => {
    setIsProductsLoading(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest`
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
    <section
      aria-describedby="latest-arrivals-section"
      className={clsx(
        'px-4 py-12 md:py-16 lg:p-24',
        'flex flex-col gap-8',
        'h-full',
        className
      )}>
      <div className="flex justify-between items-center md:items-start">
        <div className="font-semibold text-2xl md:text-3xl">
          Latest Arrivals
        </div>
        <Button label="View all" variant="secondary" href="/latest" size="lg" />
      </div>
      {isProductsLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <ProductGridSection products={products} />
      )}
    </section>
  );
};

export default LatestArrivalsSection;
