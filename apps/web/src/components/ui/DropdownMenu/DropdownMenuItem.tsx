import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';

import type { Props as AnchorProps } from '../Anchor';
import Anchor from '../Anchor';
import type { TextColor } from '../Text';
import DropdownMenuItemContent from './DropdownMenuItemContent';
import { dropdownContentItemClassName } from './dropdownStyles';

export type Props = Readonly<{
  color?: TextColor;
  endAddOn?: React.ReactNode;
  href?: AnchorProps['href'];
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  locale?: AnchorProps['locale'];
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export default function DropdownMenuItem({
  color,
  endAddOn,
  href,
  icon: Icon,
  isSelected = false,
  label,
  locale,
  onClick,
}: Props) {
  const props = {
    children: (
      <DropdownMenuItemContent
        color={color}
        endAddOn={endAddOn}
        icon={Icon}
        isSelected={isSelected}
        label={label}
      />
    ),
    className: dropdownContentItemClassName,
    locale,
    onClick,
  };

  return (
    <DropdownMenuPrimitive.Item asChild={true}>
      {href == null ? (
        <button type="button" {...props} />
      ) : (
        <Anchor href={href} variant="unstyled" weight="normal" {...props} />
      )}
    </DropdownMenuPrimitive.Item>
  );
}
