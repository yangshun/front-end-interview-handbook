import clsx from 'clsx';
import React from 'react';

import Anchor from '../Anchor';
import type { TextColor } from '../Text';
import Text from '../Text';
import {
  themeBackgroundElementEmphasizedStateColor_Focus,
  themeBackgroundElementEmphasizedStateColor_Hover,
} from '../theme';

import { Item } from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  color?: TextColor;
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuItem({
  color = 'secondary',
  href,
  icon: Icon,
  isSelected = false,
  label,
  onClick,
}: Props) {
  const props = {
    children: (
      <Text
        className="items-center gap-x-2"
        color={isSelected ? 'active' : color}
        display="flex"
        size="body2">
        {Icon && <Icon className="size-4 shrink-0" />}
        {label}
      </Text>
    ),
    className: clsx(
      'block px-2 py-1.5',
      'w-full text-left',
      'rounded',
      'select-none outline-none',
      themeBackgroundElementEmphasizedStateColor_Hover,
      themeBackgroundElementEmphasizedStateColor_Focus,
    ),
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
