import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import React from 'react';

import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
} from '~/components/ui/theme';

export type PopoverContentAlignment = 'center' | 'end' | 'start';
export type PopoverContentSide = 'bottom' | 'left' | 'right' | 'top';

type Props = Readonly<{
  __forceDark?: boolean;
  align?: PopoverContentAlignment;
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  isShown?: boolean;
  onClose?: () => void;
  side?: PopoverContentSide;
  trigger: React.ReactNode;
}>;

const popoverContentClassName = clsx(
  'p-6',
  'rounded-lg',
  'shadow-lg',
  themeBackgroundLayerEmphasized,
  ['border', themeBorderElementColor],
  'text-sm',
  'z-popover',
);

export default function ProjectsNotificationPopover({
  __forceDark = false,
  align = 'end',
  asChild = true,
  children,
  side = 'right',
  trigger,
  className,
  isShown,
  onClose,
}: Props) {
  return (
    <div className="relative">
      <PopoverPrimitive.Root
        open={isShown}
        onOpenChange={(open) => {
          if (!open) {
            onClose?.();
          }
        }}>
        <PopoverPrimitive.Trigger asChild={asChild} className="z-1">
          {trigger}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align={align}
            className={clsx(popoverContentClassName, className)}
            data-color-scheme={__forceDark ? 'dark' : undefined}
            side={side}
            sideOffset={8}>
            {children}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}
