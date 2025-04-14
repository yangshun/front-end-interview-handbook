import ProductSpecificationSection from 'src/components/ProductSpecificationSection';

import ProductCollectionSection from './components/ProductCollectionSection';
import ProductDetailSection from './components/ProductDetailSection';
import ProductDetailsContextProvider from './components/ProductDetailsContext';

const ProductDetailPage = () => {
  return (
    <>
      <ProductDetailsContextProvider>
        <ProductDetailSection />
      </ProductDetailsContextProvider>
      <ProductSpecificationSection />
      <ProductCollectionSection />
    </>
  );
};

export default ProductDetailPage;
