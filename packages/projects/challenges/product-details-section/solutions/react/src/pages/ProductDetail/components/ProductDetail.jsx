import ProductImages from './ProductImages';
import ProductMetadata from './ProductMetadata';

import { useProductDetailsContext } from './ProductDetailsContext';

const ProductDetail = () => {
  const { isProductLoading, product } = useProductDetailsContext();

  if (isProductLoading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col-span-4 md:col-span-6">
        <ProductImages />
      </div>
      <div className="col-span-4 md:col-span-6">
        <ProductMetadata />
      </div>
    </>
  );
};

export default ProductDetail;
