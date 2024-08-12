import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductGridSection from 'src/components/ProductGridSection';

const ProductCollectionSection = () => {
  const { productId } = useParams();
  const [collectionProducts, setCollectionsProducts] = useState([]);
  const [isCollectionProductsLoading, setIsCollectionProductsLoading] =
    useState(true);

  const getCollectionsProducts = useCallback(async () => {
    setIsCollectionProductsLoading(true);

    const data = await fetch(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest`
    );
    const result = await data.json();

    if (!result.error) {
      setCollectionsProducts(
        result.data.filter(item => item.product_id !== productId).slice(0, 4)
      );
    }
    setIsCollectionProductsLoading(false);
  }, [productId]);

  useEffect(() => {
    getCollectionsProducts();
  }, [getCollectionsProducts]);

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
