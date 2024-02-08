import clsx from 'clsx';
import React from 'react';

import { dropdownContentItemClassName } from './dropdownStyles';
import Anchor from '../Anchor';
import type { TextColor } from '../Text';
import Text from '../Text';
import { themeTextSubtleColor } from '../theme';

import { Item } from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  color?: TextColor;
  href?: string;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
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
        {Icon && (
          <Icon
            className={clsx(
              'size-4 shrink-0',
              !isSelected && themeTextSubtleColor,
            )}
          />
        )}
        {label}
      </Text>
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
