import clsx from 'clsx';
import React from 'react';

import { popoverContentClassName } from './popoverStyles';
import Button from '../Button';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';

export type PopoverTriggerSize = 'md' | 'sm' | 'xs';
export type PopoverTriggerVariant = 'secondary' | 'tertiary';

export type PopoverContentAlignment = 'center' | 'end' | 'start';
export type PopoverContentWidth = 'lg' | 'md' | 'sm';
export type PopoverContentSide = 'bottom' | 'left' | 'right' | 'top';

type Props = Readonly<{
  __forceDark?: boolean;
  align?: PopoverContentAlignment;
  children: React.ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  side?: PopoverContentSide;
  size?: PopoverTriggerSize;
  variant?: PopoverTriggerVariant;
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
  children,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  label,
  side = 'bottom',
  size = 'md',
  width = 'md',
  variant = 'secondary',
}: Props) {
  return (
    <Root>
      <Trigger asChild={true}>
        <Button
          icon={Icon}
          isDisabled={isDisabled}
          isLabelHidden={isLabelHidden}
          label={label}
          size={size}
          variant={variant}
        />
      </Trigger>
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
