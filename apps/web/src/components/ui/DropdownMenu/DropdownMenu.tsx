import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import DropdownMenuItem from './DropdownMenuItem';
import DropdownMenuSub from './DropdownMenuSub';
import { dropdownContentClassName } from './dropdownStyles';
import Button from '../Button';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

export type DropdownMenuAlignment = 'center' | 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';
export type DropdownMenuSide = 'bottom' | 'left' | 'right' | 'top';
export type DropdownMenuVariant = 'secondary' | 'tertiary';
export type DropdownLabelColor = 'default' | 'inherit';

type Props = Readonly<{
  align?: DropdownMenuAlignment;
  // TODO: Change to strict children.
  children: React.ReactNode;
  forceDark?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  labelColor?: DropdownLabelColor;
  showChevron?: boolean;
  side?: DropdownMenuSide;
  size?: DropdownMenuSize;
  variant?: DropdownMenuVariant;
}>;

DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Sub = DropdownMenuSub;

export default function DropdownMenu({
  align = 'start',
  children,
  forceDark = false,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  label,
  side = 'bottom',
  showChevron = true,
  size = 'md',
  variant = 'secondary',
}: Props) {
  return (
    <Root>
      <Trigger asChild={true}>
        <Button
          icon={Icon}
          iconSecondary_USE_SPARINGLY={
            showChevron ? RiArrowDownSLine : undefined
          }
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
          className={dropdownContentClassName}
          data-mode={forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
