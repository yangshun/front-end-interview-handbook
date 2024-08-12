import { Dropdown, DropdownItem } from 'src/components/ui/Dropdown';

import { useProductListingContext } from './ProductListingContext';
import { SORT_OPTIONS } from 'src/constants';

const SortByFilter = () => {
  const { onSortChange, selectedSort } = useProductListingContext();
  return (
    <Dropdown>
      {SORT_OPTIONS.map(option => (
        <DropdownItem
          key={option.value + option.direction}
          isSelected={
            option.value === selectedSort.value &&
            option.direction === selectedSort.direction
          }
          onSelect={() =>
            onSortChange({ value: option.value, direction: option.direction })
          }>
          {option.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default SortByFilter;
