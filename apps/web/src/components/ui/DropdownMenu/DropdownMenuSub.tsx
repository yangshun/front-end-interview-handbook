import clsx from 'clsx';
import React from 'react';

import type { Props as DropdownMenuItemProps } from './DropdownMenuItem';
import DropdownMenuItemContent from './DropdownMenuItemContent';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from './dropdownStyles';
import type { TextColor } from '../Text';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type ChildItem = React.ReactElement<DropdownMenuItemProps>;

export type Props = Readonly<{
  __forceDark?: boolean;
  children: ChildItem | ReadonlyArray<ChildItem>;
  color?: TextColor;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuSub({
  __forceDark = false,
  color,
  children,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  return (
    <DropdownMenuPrimitive.Sub>
      <DropdownMenuPrimitive.SubTrigger
        className={clsx(dropdownContentItemClassName)}
        onClick={onClick}>
        <DropdownMenuItemContent
          color={color}
          icon={Icon}
          isSelected={isSelected}
          label={label}
          usage="trigger"
        />
      </DropdownMenuPrimitive.SubTrigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.SubContent
          className={dropdownContentClassName}
          data-color-scheme={__forceDark ? 'dark' : undefined}>
          {children}
        </DropdownMenuPrimitive.SubContent>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Sub>
  );
}