import clsx from 'clsx';
import React, { Fragment } from 'react';

import DropdownMenuItem from './DropdownMenuItem';
import type { TextVariant } from '../Text';
import Text from '../Text';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export type DropdownMenuAlignment = 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  children: React.ReactNode; // TODO: Change to strict children.
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: React.ReactNode;
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

const textSizeVariants: Record<DropdownMenuSize, TextVariant> = {
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
  label,
  size = 'md',
  icon: Icon,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <div className="flex">
        <Menu.Button
          className={clsx(
            'group inline-flex items-center px-2.5',
            'rounded',
            'transition-colors',
            'border border-slate-200 dark:border-slate-800',
            'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700',
            'focus:border-brand-500 focus:outline-brand-500 focus:outline-2 focus:outline-offset-2 focus:ring-0',
            heightClasses[size],
          )}>
          <Text
            className={clsx(
              'flex items-center justify-center',
              spacingClasses[size],
            )}
            variant={textSizeVariants[size]}
            weight="medium">
            {Icon != null && (
              <Icon
                aria-hidden="true"
                className={clsx('flex-shrink-0', sizeIconClasses[size])}
              />
            )}
            {label}
            <ChevronDownIcon
              aria-hidden="true"
              className={clsx('flex-shrink-0', sizeIconClasses[size])}
            />
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
            'bg-white dark:bg-slate-800',
            'shadow-lg',
            'ring-brand-500 ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text
            className="p-2"
            display="block"
            variant={textSizeVariants[size]}
            weight="medium">
            {children}
          </Text>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
