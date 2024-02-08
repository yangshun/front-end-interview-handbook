import clsx from 'clsx';
import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from './dropdownStyles';
import type { TextColor } from '../Text';
import Text from '../Text';
import { themeTextSubtleColor } from '../theme';

import {
  Portal,
  Sub,
  SubContent,
  SubTrigger,
} from '@radix-ui/react-dropdown-menu';

export type DropdownMenuAlignment = 'center' | 'end' | 'start';
export type DropdownMenuSize = 'md' | 'sm' | 'xs';
export type DropdownMenuSide = 'bottom' | 'left' | 'right' | 'top';
export type DropdownMenuVariant = 'secondary' | 'tertiary';
export type DropdownLabelColor = 'default' | 'inherit';

type Props = Readonly<{
  // TODO: Change to strict children.
  children: React.ReactNode;
  color?: TextColor;
  forceDark?: boolean;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isSelected?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuSub({
  color = 'secondary',
  children,
  forceDark = false,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  return (
    <Sub>
      <SubTrigger
        className={clsx(dropdownContentItemClassName)}
        onClick={onClick}>
        <Text
          className="items-center gap-x-2"
          color={isSelected ? 'active' : color}
          display="flex"
          size="body2">
          {Icon && (
            <Icon
              className={clsx(
                'size-4 shrink-0',
                !isSelected && themeTextSubtleColor,
              )}
            />
          )}
          {label}
          <RiArrowRightSLine className="size-4 shrink-0 ml-auto" />
        </Text>
      </SubTrigger>
      <Portal>
        <SubContent
          className={dropdownContentClassName}
          data-mode={forceDark ? 'dark' : undefined}>
          {children}
        </SubContent>
      </Portal>
    </Sub>
  );
}
