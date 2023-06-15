import clsx from 'clsx';
import React, { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import DropdownMenuItem from './DropdownMenuItem';
import type { TextSize } from '../Text';
import Text from '../Text';

import { Menu, Transition } from '@headlessui/react';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  children: React.ReactNode;
  // TODO: Change to strict children.
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  showChevron?: boolean;
  size?: DropdownMenuSize;
}>;

DropdownMenu.Item = DropdownMenuItem;

const alignmentClasses: Record<DropdownMenuAlignment, string> = {
  end: 'origin-top-right right-0',
  start: 'origin-top-left left-0',
};

const heightClasses: Record<DropdownMenuSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

const widthClasses: Record<DropdownMenuSize, string> = {
  md: 'w-9',
  sm: 'w-8',
  xs: 'w-7',
};

const horizontalPaddingClasses: Record<DropdownMenuSize, string> = {
  md: 'px-4',
  sm: 'px-3',
  xs: 'px-2',
};

const textSizeVariants: Record<DropdownMenuSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
  xs: 'body3',
};

const spacingClasses: Record<DropdownMenuSize, string> = {
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xs: 'gap-x-1',
};

const sizeIconClasses: Record<DropdownMenuSize, string> = {
  md: 'h-4 w-4',
  sm: 'h-4 w-4',
  xs: 'h-4 w-4',
};

export default function DropdownMenu({
  align = 'start',
  children,
  isLabelHidden = false,
  label,
  showChevron = true,
  size = 'md',
  icon: Icon,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block shrink-0">
      <div className="flex">
        <Menu.Button
          aria-label={isLabelHidden ? label : undefined}
          className={clsx(
            'group inline-flex items-center justify-center',
            'rounded-full',
            'transition-colors',
            'border border-neutral-200 dark:border-neutral-800',
            'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-700',
            'focus:border-brand focus:outline-brand focus:outline-2 focus:outline-offset-2 focus:ring-0',
            isLabelHidden && !showChevron
              ? widthClasses[size]
              : horizontalPaddingClasses[size],
            heightClasses[size],
          )}>
          <Text
            className={clsx(
              'flex items-center justify-center',
              spacingClasses[size],
            )}
            size={textSizeVariants[size]}
            weight="medium">
            {Icon != null && (
              <Icon
                aria-hidden="true"
                className={clsx('flex-shrink-0', sizeIconClasses[size])}
              />
            )}
            {!isLabelHidden && label}
            {showChevron && (
              <RiArrowDownSLine
                aria-hidden="true"
                className={clsx('flex-shrink-0', sizeIconClasses[size])}
              />
            )}
          </Text>
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
            alignmentClasses[align],
            'absolute z-10 mt-2 w-48',
            'rounded',
            'bg-white dark:bg-neutral-900',
            'shadow-lg',
            'ring-brand ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text
            className="p-2"
            display="block"
            size={textSizeVariants[size]}
            weight="medium">
            {children}
          </Text>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
