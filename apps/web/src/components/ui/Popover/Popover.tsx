import clsx from 'clsx';
import React, { Fragment } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import type { TextSize } from '../Text';
import Text from '../Text';
import { themeBackgroundColor, themeLineColor } from '../theme';

import { Popover as HeadlessPopover, Transition } from '@headlessui/react';

export type PopoverAlignment = 'end' | 'start';
export type PopoverSize = 'md' | 'sm' | 'xs';
export type PopoverWidth = 'lg' | 'md' | 'sm';

type Props = Readonly<{
  align?: PopoverAlignment;
  children: React.ReactNode;
  // TODO: Change to strict children.
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  showChevron?: boolean;
  size?: PopoverSize;
  width?: PopoverWidth;
}>;

const alignmentClasses: Record<PopoverAlignment, string> = {
  end: 'origin-top-right right-0',
  start: 'origin-top-left left-0',
};

const heightClasses: Record<PopoverSize, string> = {
  md: 'h-9',
  sm: 'h-8',
  xs: 'h-7',
};

const widthClasses: Record<PopoverSize, string> = {
  md: 'w-9',
  sm: 'w-8',
  xs: 'w-7',
};

const panelWidthClasses: Record<PopoverWidth, string> = {
  lg: 'w-[640px]',
  md: 'w-80',
  sm: 'w-40',
};

const horizontalPaddingClasses: Record<PopoverSize, string> = {
  md: 'px-4',
  sm: 'px-3',
  xs: 'px-2',
};

const textSizeVariants: Record<PopoverSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
  xs: 'body3',
};

const spacingClasses: Record<PopoverSize, string> = {
  md: 'gap-x-1',
  sm: 'gap-x-1',
  xs: 'gap-x-1',
};

const sizeIconClasses: Record<PopoverSize, string> = {
  md: 'h-4 w-4',
  sm: 'h-4 w-4',
  xs: 'h-4 w-4',
};

export default function Popover({
  align = 'start',
  children,
  isLabelHidden = false,
  label,
  showChevron = true,
  size = 'md',
  width = 'md',
  icon: Icon,
}: Props) {
  return (
    <HeadlessPopover as="div" className="relative inline-block shrink-0">
      <div className="flex">
        <HeadlessPopover.Button
          aria-label={isLabelHidden ? label : undefined}
          className={clsx(
            'group inline-flex items-center justify-center',
            'rounded-full',
            'transition-colors',
            'border',
            themeLineColor,
            'bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-700',
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
        </HeadlessPopover.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <HeadlessPopover.Panel
          className={clsx(
            alignmentClasses[align],
            panelWidthClasses[width],
            'absolute z-20 mt-2',
            'rounded-md',
            themeBackgroundColor,
            ['border', 'border-transparent dark:border-neutral-800'],
            'max-h-48',
            'overflow-y-auto',
            'shadow-lg',
            'ring-brand ring-1 ring-opacity-5 focus:outline-none',
          )}>
          <Text className="p-4" display="block" size={textSizeVariants[size]}>
            {children}
          </Text>
        </HeadlessPopover.Panel>
      </Transition>
    </HeadlessPopover>
  );
}
