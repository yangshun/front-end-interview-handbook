import clsx from 'clsx';
import ProductCard from 'src/components/ProductCard';

const LatestArrivalsSection = ({ products }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-x-4 md:gap-x-8 gap-y-8">
      {products.map(product => (
        <div
          key={product.product_id}
          className={clsx('col-span-4 md:col-span-3')}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default LatestArrivalsSection;
