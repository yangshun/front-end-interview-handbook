import { useState } from 'react';
import {
  Ri24HoursLine,
  RiPriceTag2Line,
  RiPriceTagLine,
  RiSortDesc,
  RiStarLine,
  RiThumbUpLine,
} from 'react-icons/ri';

import DropdownMenu from './DropdownMenu';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const menuItems = [
  {
    icon: RiStarLine,
    label: 'Most Popular',
    value: 'most-popular',
  },
  {
    icon: RiThumbUpLine,
    label: 'Best Rating',
    value: 'best-rating',
  },
  {
    icon: Ri24HoursLine,
    label: 'Newest',
    value: 'newest',
  },
  {
    icon: RiPriceTagLine,
    label: 'Price: Low to High',
    value: 'price-high-to-low',
  },
  {
    icon: RiPriceTag2Line,
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
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
              isSelected={value === selectedValue}
              label={label}
              onClick={() => {
                setSelectedValue(value);
              }}
            />
          ))}
        </DropdownMenu>
        <DropdownMenu icon={RiSortDesc} label="Sort By" size="sm">
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
              isSelected={value === selectedValue}
              label={label}
              onClick={() => {
                setSelectedValue(value);
              }}
            />
          ))}
        </DropdownMenu>
        <DropdownMenu icon={RiSortDesc} label="Sort By" size="xs">
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
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
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
              isSelected={value === selectedValue}
              label={label}
              onClick={() => {
                setSelectedValue(value);
              }}
            />
          ))}
        </DropdownMenu>
        <DropdownMenu align="end" label="Align End">
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
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
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
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
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
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
          showChevron={false}
          variant="flat">
          {menuItems.map(({ icon, label, value }) => (
            <DropdownMenu.Item
              key={value}
              icon={icon}
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
