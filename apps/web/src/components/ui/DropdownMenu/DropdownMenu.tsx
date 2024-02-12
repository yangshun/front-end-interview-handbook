import type { ReactNode } from 'react';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import type { Props as DropdownMenuItemProps } from './DropdownMenuItem';
import DropdownMenuItem from './DropdownMenuItem';
import type { Props as DropdownMenuSubProps } from './DropdownMenuSub';
import DropdownMenuSub from './DropdownMenuSub';
import { dropdownContentClassName } from './dropdownStyles';
import Button from '../Button';
import type { TooltipContentAlignment, TooltipContentSide } from '../Tooltip';

import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

export type DropdownMenuTriggerLabelColor = 'default' | 'inherit';
export type DropdownMenuTriggerSize = 'md' | 'sm' | 'xs';
export type DropdownMenuTriggerVariant = 'secondary' | 'tertiary';

export type DropdownMenuContentAlignment = 'center' | 'end' | 'start';
export type DropdownMenuContentSide = 'bottom' | 'left' | 'right' | 'top';

type ChildItem = React.ReactElement<
  DropdownMenuItemProps | DropdownMenuSubProps
>;

type Props = Readonly<{
  __forceDark?: boolean;
  align?: DropdownMenuContentAlignment;
  children: ChildItem | ReadonlyArray<ChildItem>;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  label: string;
  showChevron?: boolean;
  side?: DropdownMenuContentSide;
  size?: DropdownMenuTriggerSize;
  tooltip?: ReactNode;
  tooltipAlign?: TooltipContentAlignment;
  tooltipSide?: TooltipContentSide;
  variant?: DropdownMenuTriggerVariant;
}>;

DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Sub = DropdownMenuSub;

export default function DropdownMenu({
  __forceDark = false,
  align = 'start',
  children,
  icon: Icon,
  isDisabled = false,
  isLabelHidden = false,
  label,
  side = 'bottom',
  showChevron = true,
  size = 'md',
  tooltip,
  tooltipAlign,
  tooltipSide,
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
          tooltip={tooltip}
          tooltipAlign={tooltipAlign}
          tooltipSide={tooltipSide}
          variant={variant}
        />
      </Trigger>
      <Portal>
        <Content
          align={align}
          className={dropdownContentClassName}
          data-mode={__forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
