'use client';

import { useIntl } from '~/components/intl';

import type { Product } from './RoadmapPage';
import RoadmapProductFilterButton from './RoadmapProductFilterButton';

type Props = Readonly<{
  onProductFilterChange: (filters: ReadonlyArray<Product>) => void;
  selectedProducts: ReadonlyArray<Product>;
}>;

function RoadmapProductFilter({
  onProductFilterChange,
  selectedProducts,
}: Props) {
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
      <RoadmapProductFilterButton
        label={intl.formatMessage({
          defaultMessage: 'Interviews',
          description: 'Label for Interviews filter button',
          id: 'vHU58I',
        })}
        selected={selectedProducts.includes('interviews')}
        size="sm"
        onClick={() => handleProductFilterChange('interviews')}
      />
      <RoadmapProductFilterButton
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

export default RoadmapProductFilter;
