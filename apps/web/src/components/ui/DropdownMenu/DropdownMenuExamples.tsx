import { useState } from 'react';
import {
  Ri24HoursLine,
  RiComputerLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiMoonLine,
  RiPriceTag2Line,
  RiPriceTagLine,
  RiSettings3Line,
  RiSortDesc,
  RiStarLine,
  RiSunLine,
  RiThumbUpLine,
  RiTranslate2,
} from 'react-icons/ri';

import GuidesDropdownMenu from '~/components/guides/GuidesDropdownMenu';

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
        <DropdownMenu icon={RiSortDesc} label="Sort by">
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
        <DropdownMenu icon={RiSortDesc} label="Sort by" size="sm">
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
        <DropdownMenu icon={RiSortDesc} label="Sort by" size="xs">
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
        <DropdownMenu label="Align start">
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
        <DropdownMenu align="center" label="Align center">
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
        <DropdownMenu align="end" label="Align end">
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
        <DropdownMenu label="Top" side="top">
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
        <DropdownMenu align="end" label="Top + end" side="top">
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
        <DropdownMenu icon={RiSortDesc} isLabelHidden={true} label="Sort by">
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
          label="Sort by"
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
          label="Sort by"
          showChevron={false}
          variant="tertiary">
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
        <DropdownMenu
          icon={RiSortDesc}
          label="With tooltip"
          size="sm"
          tooltip="Sort by some fields">
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
        <DropdownMenu icon={RiMenuLine} label="Submenu">
          <DropdownMenu.Sub icon={RiMoonLine} label="Theme">
            <DropdownMenu.Item icon={RiSunLine} label="Light" />
            <DropdownMenu.Item icon={RiMoonLine} label="Dark" />
            <DropdownMenu.Item icon={RiComputerLine} label="System" />
          </DropdownMenu.Sub>
          <DropdownMenu.Sub icon={RiTranslate2} label="Language">
            <DropdownMenu.Item label="English" />
            <DropdownMenu.Item label="Chinese" />
            <DropdownMenu.Item label="Japanese" />
          </DropdownMenu.Sub>
          <DropdownMenu.Item icon={RiSettings3Line} label="Settings" />
          <DropdownMenu.Item
            color="error"
            icon={RiLogoutBoxLine}
            label="Log out"
          />
        </DropdownMenu>
      </div>
      <div>
        <GuidesDropdownMenu guide="FRONT_END_INTERVIEW_PLAYBOOK" />
      </div>
    </UIExamplesGroup>
  );
}
