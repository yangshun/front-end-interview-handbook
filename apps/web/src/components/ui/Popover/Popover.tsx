import clsx from 'clsx';
import React from 'react';

import { popoverContentClassName } from './popoverStyles';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';

export type PopoverContentAlignment = 'center' | 'end' | 'start';
export type PopoverContentWidth = 'lg' | 'md' | 'sm';
export type PopoverContentSide = 'bottom' | 'left' | 'right' | 'top';

type Props = Readonly<{
  __forceDark?: boolean;
  align?: PopoverContentAlignment;
  asChild?: boolean;
  children: React.ReactNode;
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
}: Props) {
  return (
    <Root>
      <Trigger asChild={asChild}>{trigger}</Trigger>
      <Portal>
        <Content
          align={align}
          className={clsx(popoverContentClassName, panelWidthClasses[width])}
          data-mode={__forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
