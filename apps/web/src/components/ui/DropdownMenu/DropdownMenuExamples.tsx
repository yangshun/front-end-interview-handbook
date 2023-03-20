import { useState } from 'react';

import DropdownMenu from './DropdownMenu';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const menuItems = [
  {
    label: 'Most Popular',
    value: 'most-popular',
  },
  {
    label: 'Best Rating',
    value: 'best-rating',
  },
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Price: Low to High',
    value: 'price-high-to-low',
  },
  {
    label: 'Price: High to Low',
    value: 'price-low-to-high',
  },
];

export default function DropdownMenuExamples() {
  const [selectedValue, setSelectedValue] = useState('most-popular');

  return (
    <UIExamplesGroup title="Dropdown Menu">
      <div className="flex space-x-24">
        <DropdownMenu label="Sort By">
          {menuItems.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              isSelected={value === selectedValue}
              label={label}
              onClick={() => {
                setSelectedValue(value);
              }}
            />
          ))}
        </DropdownMenu>
        <DropdownMenu align="end" label="Sort By">
          {menuItems.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              isSelected={value === selectedValue}
              label={label}
              onClick={() => {
                setSelectedValue(value);
              }}
            />
          ))}
        </DropdownMenu>
      </div>
    </UIExamplesGroup>
  );
}
