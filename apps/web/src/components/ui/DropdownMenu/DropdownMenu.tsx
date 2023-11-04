import clsx from 'clsx';
import React, { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import DropdownMenuItem from './DropdownMenuItem';
import type { TextSize } from '../Text';
import Text from '../Text';
import { themeBackgroundColor } from '../theme';

import { Menu, Transition } from '@headlessui/react';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuPosition = 'above' | 'below';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';
export type DropdownMenuVariant = 'bordered' | 'flat';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  children: React.ReactNode;
  // TODO: Change to strict children.
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  position?: DropdownMenuPosition;
  showChevron?: boolean;
  size?: DropdownMenuSize;
  variant?: DropdownMenuVariant;
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

const variantClasses: Record<DropdownMenuVariant, string> = {
  bordered: 'border border-neutral-300 dark:border-neutral-700',
  flat: '',
};

const abovePositionClasses: Record<DropdownMenuSize, string> = {
  md: 'bottom-11',
  sm: 'bottom-10',
  xs: 'bottom-9',
};

export default function DropdownMenu({
  align = 'start',
  children,
  isLabelHidden = false,
  label,
  position = 'below',
  showChevron = true,
  size = 'md',
  variant = 'bordered',
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
            variantClasses[variant],
            [
              'bg-white dark:bg-neutral-950',
              'hover:bg-neutral-100 dark:hover:bg-neutral-900',
            ],
            [
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-brand-dark dark:focus-visible:outline-brand',
            ],
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
            position === 'above' ? abovePositionClasses[size] : 'mt-2',
            'absolute z-10 w-48',
            'rounded-md',
            themeBackgroundColor,
            ['border', 'border-neutral-300 dark:border-neutral-700'],
            'ring-brand ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text className="p-2" display="block" size={textSizeVariants[size]}>
            {children}
          </Text>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
