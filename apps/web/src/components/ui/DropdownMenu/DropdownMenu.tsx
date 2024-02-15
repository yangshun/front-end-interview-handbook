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

type ChildItem =
  | React.ReactElement<DropdownMenuItemProps | DropdownMenuSubProps>
  | false
  | null
  | undefined;

type CommonProps = Readonly<{
  __forceDark?: boolean;
  align?: DropdownMenuContentAlignment;
  asChild?: boolean;
  children: ChildItem | ReadonlyArray<ChildItem>;
  side?: DropdownMenuContentSide;
}>;

type ButtonModeProps = CommonProps &
  Readonly<{
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    isDisabled?: boolean;
    isLabelHidden?: boolean;
    label: string;
    showChevron?: boolean;
    size?: DropdownMenuTriggerSize;
    tooltip?: ReactNode;
    tooltipAlign?: TooltipContentAlignment;
    tooltipSide?: TooltipContentSide;
    variant?: DropdownMenuTriggerVariant;
  }>;

type CustomTriggerModeProps = CommonProps &
  Readonly<{
    trigger: ReactNode;
  }>;

type Props = ButtonModeProps | CustomTriggerModeProps;

DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Sub = DropdownMenuSub;

export default function DropdownMenu({
  __forceDark = false,
  align = 'start',
  asChild = true,
  children,
  side = 'bottom',
  ...props
}: Props) {
  return (
    <Root>
      <Trigger asChild={asChild}>
        {'trigger' in props ? (
          props.trigger
        ) : (
          <Button
            icon={props.icon}
            iconSecondary_USE_SPARINGLY={
              props.showChevron ? RiArrowDownSLine : undefined
            }
            isDisabled={props.isDisabled}
            isLabelHidden={props.isLabelHidden}
            label={props.label}
            size={props.size}
            tooltip={props.tooltip}
            tooltipAlign={props.tooltipAlign}
            tooltipSide={props.tooltipSide}
            variant={props.variant ?? 'secondary'}
          />
        )}
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
