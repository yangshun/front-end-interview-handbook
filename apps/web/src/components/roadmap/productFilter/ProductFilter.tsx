'use client';

import { useIntl } from 'react-intl';

import type { Product } from '../hooks/useRoadmap';
import ProductFilterButton from '../productFilterButton/ProductFilterButton';

type Props = Readonly<{
  onProductFilterChange: (filters: Array<Product>) => void;
  selectedProducts: Array<Product>;
}>;

function ProductFilter({ onProductFilterChange, selectedProducts }: Props) {
  const intl = useIntl();

  const handleProductFilterChange = (product: Product) => {
    let newSelected = [...selectedProducts];

    if (newSelected.includes(product)) {
      newSelected = newSelected.filter(
        (productFilter) => productFilter !== product,
      );
    } else {
      newSelected = [...newSelected, product];
    }
    onProductFilterChange(newSelected);
  };

  return (
    <div className="flex items-center gap-4">
      <ProductFilterButton
        label={intl.formatMessage({
          defaultMessage: 'Interviews',
          description: 'Label for Interviews filter button',
          id: 'vHU58I',
        })}
        selected={selectedProducts.includes('interviews')}
        size="sm"
        onClick={() => handleProductFilterChange('interviews')}
      />
      <ProductFilterButton
        label={intl.formatMessage({
          defaultMessage: 'Projects',
          description: 'Label for Project filter button',
          id: 'mbOL/R',
        })}
        selected={selectedProducts.includes('projects')}
        size="sm"
        onClick={() => handleProductFilterChange('projects')}
      />
    </div>
  );
}

export default ProductFilter;
