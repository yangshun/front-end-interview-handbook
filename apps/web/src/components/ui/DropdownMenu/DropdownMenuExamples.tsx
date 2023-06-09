import { useState } from 'react';

import DropdownMenu from './DropdownMenu';
import UIExamplesGroup from '../misc/UIExamplesGroup';

import { BarsArrowDownIcon } from '@heroicons/react/24/outline';

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
    <UIExamplesGroup gapSize="lg" title="Dropdown Menu">
      <div className="flex gap-x-24">
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
      <div>
        <DropdownMenu label="Sort By" size="sm">
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
      <div className="flex gap-x-24">
        <DropdownMenu icon={BarsArrowDownIcon} label="Sort By">
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
        <DropdownMenu icon={BarsArrowDownIcon} label="Sort By" size="sm">
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
