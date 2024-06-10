import clsx from 'clsx';
import React from 'react';

import { popoverContentClassName } from './popoverStyles';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export type PopoverContentAlignment = 'center' | 'end' | 'start';
export type PopoverContentWidth = 'lg' | 'md' | 'sm';
export type PopoverContentSide = 'bottom' | 'left' | 'right' | 'top';

type Props = Readonly<{
  __forceDark?: boolean;
  align?: PopoverContentAlignment;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  side?: PopoverContentSide;
  trigger: React.ReactNode;
  width?: PopoverContentWidth;
}>;

const panelWidthClasses: Record<PopoverContentWidth, string> = {
  lg: 'w-[640px]',
  md: 'w-80',
  sm: 'w-40',
};

export default function Popover({
  __forceDark = false,
  align = 'start',
  asChild = true,
  children,
  side = 'bottom',
  trigger,
  width = 'md',
  className,
}: Props) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild={asChild}>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          className={clsx(
            popoverContentClassName,
            panelWidthClasses[width],
            className,
          )}
          data-color-scheme={__forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}>
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
