import React from 'react';

import DropdownMenuItemContent from './DropdownMenuItemContent';
import { dropdownContentItemClassName } from './dropdownStyles';
import Anchor from '../Anchor';
import type { TextColor } from '../Text';

import { Item } from '@radix-ui/react-dropdown-menu';

export type Props = Readonly<{
  color?: TextColor;
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuItem({
  color,
  href,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  const props = {
    children: (
      <DropdownMenuItemContent
        color={color}
        icon={Icon}
        isSelected={isSelected}
        label={label}
      />
    ),
    className: dropdownContentItemClassName,
    onClick,
  };

  return (
    <Item asChild={true}>
      {href == null ? (
        <button type="button" {...props} />
      ) : (
        <Anchor href={href} variant="unstyled" {...props} />
      )}
    </Item>
  );
}
