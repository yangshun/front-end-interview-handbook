import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import GuidesDropdownMenuItem from './GuidesDropdownMenuItem';
import Text from '../ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundEmphasized,
  themeBackgroundLayerEmphasized,
  themeBackgroundLayerEmphasizedHover,
  themeGlassyBorder,
  themeTextSecondaryColor,
} from '../ui/theme';

import { Menu, Transition } from '@headlessui/react';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  // TODO: Change to strict children.
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  showChevron?: boolean;
}>;

export default function GuidesDropdownMenu({
  isLabelHidden = false,
  showChevron = true,
}: Props) {
  const guidesData = useGuidesData();
  const guides = [
    guidesData['front-end-interview-guidebook'],
    guidesData['front-end-system-design-guidebook'],
    guidesData['behavioral-interview-guidebook'],
  ];

  const pathname = usePathname();

  const selectedGuide =
    Object.values(guides).find(({ href }) => pathname?.startsWith(href)) ??
    guides[0];

  const Icon = selectedGuide.icon;
  const label = selectedGuide.shortName;

  return (
    <Menu as="div" className="relative inline-block w-full shrink-0">
      <div className="flex w-full">
        <Menu.Button
          aria-label={isLabelHidden ? label : undefined}
          className={clsx(
            'group inline-flex flex-1 items-center justify-between gap-2',
            'rounded',
            'transition-colors',
            'border border-neutral-300 dark:border-neutral-700',
            [
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
            ],
            'px-3 py-1.5',
            themeGlassyBorder,
            themeBackgroundEmphasized,
            themeBackgroundLayerEmphasizedHover,
          )}>
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full',
                themeGlassyBorder,
                themeBackgroundLayerEmphasized,
              )}>
              <Icon className="h-3 w-3" />
            </div>
            <Text
              className="line-clamp-1 text-ellipsis text-left"
              size="body2"
              weight="bold">
              {label}
            </Text>
          </div>
          {showChevron && (
            <RiArrowDownSLine
              aria-hidden="true"
              className={clsx('h-4 w-4 flex-shrink-0', themeTextSecondaryColor)}
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={clsx(
            'absolute z-10 mt-2 w-64',
            'rounded-md',
            themeBackgroundColor,
            ['border', 'border-transparent dark:border-neutral-700'],
            'shadow-lg',
            'ring-brand ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text className="p-2" display="block">
            {Object.values(guides).map(({ key, href, shortName, icon }) => (
              <GuidesDropdownMenuItem
                key={key}
                href={href}
                icon={icon}
                isSelected={pathname ? href.startsWith(pathname) : false}
                label={shortName}
                onClick={() => {}}
              />
            ))}
          </Text>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
