import React from 'react';

import DropdownMenuItemContent from './DropdownMenuItemContent';
import { dropdownContentItemClassName } from './dropdownStyles';
import type { Props as AnchorProps } from '../Anchor';
import Anchor from '../Anchor';
import type { TextColor } from '../Text';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export type Props = Readonly<{
  color?: TextColor;
  endAddOn?: React.ReactNode;
  href?: AnchorProps['href'];
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  locale?: AnchorProps['locale'];
  onClick?: React.MouseEventHandler<HTMLElement>;
  refresh?: AnchorProps['refresh'];
}>;

export default function DropdownMenuItem({
  color,
  endAddOn,
  href,
  locale,
  refresh,
  icon: Icon,
  isSelected = false,
  label,
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
        <Anchor
          href={href}
          refresh={refresh}
          variant="unstyled"
          weight="normal"
          {...props}
        />
      )}
    </DropdownMenuPrimitive.Item>
  );
}
