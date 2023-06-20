import { useState } from 'react';
import { RiSortDesc } from 'react-icons/ri';

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
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Dropdown Menu">
      <div className="flex gap-x-12">
        <DropdownMenu icon={RiSortDesc} label="Sort By">
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
        <DropdownMenu icon={RiSortDesc} label="Sort By" size="sm">
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
        <DropdownMenu icon={RiSortDesc} label="Sort By" size="xs">
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
      <div className="flex gap-x-12">
        <DropdownMenu label="Align Start">
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
        <DropdownMenu align="end" label="Align End">
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
      <div className="flex gap-x-12">
        <DropdownMenu icon={RiSortDesc} isLabelHidden={true} label="Sort By">
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
        <DropdownMenu
          icon={RiSortDesc}
          isLabelHidden={true}
          label="Sort By"
          showChevron={false}>
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
