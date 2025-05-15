import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { ReactNode } from 'react';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import Button from '../Button';
import type { TooltipContentAlignment, TooltipContentSide } from '../Tooltip';
import type { Props as DropdownMenuItemProps } from './DropdownMenuItem';
import DropdownMenuItem from './DropdownMenuItem';
import type { Props as DropdownMenuLabelProps } from './DropdownMenuLabel';
import DropdownMenuLabel from './DropdownMenuLabel';
import type { Props as DropdownMenuSubProps } from './DropdownMenuSub';
import DropdownMenuSub from './DropdownMenuSub';
import { dropdownContentClassName } from './dropdownStyles';

export type DropdownMenuTriggerLabelColor = 'default' | 'inherit';
export type DropdownMenuTriggerSize = 'md' | 'sm' | 'xs';
export type DropdownMenuTriggerVariant = 'secondary' | 'tertiary';

export type DropdownMenuContentAlignment = 'center' | 'end' | 'start';
export type DropdownMenuContentSide = 'bottom' | 'left' | 'right' | 'top';

type ChildItem =
  | React.ReactElement<
      DropdownMenuItemProps | DropdownMenuLabelProps | DropdownMenuSubProps
    >
  | false
  | null
  | undefined;

type CommonProps = Readonly<{
  __forceDark?: boolean;
  align?: DropdownMenuContentAlignment;
  asChild?: boolean;
  children: ChildItem | ReadonlyArray<ChildItem>;
  modal?: boolean;
  onClose?: () => void;
  onCloseAutoFocus?: (event: Event) => void;
  side?: DropdownMenuContentSide;
  triggerClassName?: string;
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
DropdownMenu.Label = DropdownMenuLabel;

export default function DropdownMenu({
  __forceDark = false,
  align = 'start',
  asChild = true,
  children,
  side = 'bottom',
  modal = false,
  triggerClassName,
  onClose,
  onCloseAutoFocus,
  ...props
}: Props) {
  return (
    <DropdownMenuPrimitive.Root
      modal={modal}
      onOpenChange={(open) => {
        if (!open) {
          onClose?.();
        }
      }}>
      <DropdownMenuPrimitive.Trigger asChild={asChild}>
        {'trigger' in props ? (
          props.trigger
        ) : (
          <Button
            className={triggerClassName}
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
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          className={dropdownContentClassName}
          data-color-scheme={__forceDark ? 'dark' : undefined}
          side={side}
          sideOffset={8}
          onCloseAutoFocus={onCloseAutoFocus}>
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
