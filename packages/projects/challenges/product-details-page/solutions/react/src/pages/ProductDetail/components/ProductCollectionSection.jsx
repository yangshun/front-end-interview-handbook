import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ProductGridSection from 'src/components/ProductGridSection';

const ProductCollectionSection = () => {
  const [collectionProducts, setCollectionsProducts] = useState([]);
  const [isCollectionProductsLoading, setIsCollectionProductsLoading] =
    useState(true);

  const getCollectionsProducts = async () => {
    setIsCollectionProductsLoading(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest&per_page=4`
    );
    const result = await data.json();

    if (!result.error) {
      setCollectionsProducts(result.data);
    }
    setIsCollectionProductsLoading(false);
  };

  useEffect(() => {
    getCollectionsProducts();
  }, []);

  return (
    <section
      className={clsx('px-4 py-12 md:py-16 lg:p-24', 'flex flex-col gap-8')}>
      <span className="font-semibold text-2xl md:text-3xl">
        In this collection
      </span>
      {isCollectionProductsLoading ? (
        <div>Loading...</div>
      ) : (
        <ProductGridSection products={collectionProducts} />
      )}
    </section>
  );
};

export default ProductCollectionSection;
