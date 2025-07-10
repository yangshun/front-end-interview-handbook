'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { tooltipContentClassName } from './tooltipStyles';

export type TooltipContentAlignment = 'center' | 'end' | 'start';
export type TooltipContentSide = 'bottom' | 'left' | 'right' | 'top';
export type TooltipSize = 'md' | 'sm';

const sizeClasses: Record<TooltipSize, string> = {
  md: 'p-3',
  sm: 'p-2',
};

const fontSizeClasses: Record<TooltipSize, string> = {
  md: 'text-base',
  sm: 'text-sm',
};

type Props = Readonly<{
  align?: TooltipContentAlignment;
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  delayDuration?: number;
  hyphenated?: boolean;
  invert?: boolean;
  label?: ReactNode;
  onOpenChange?: React.ComponentProps<
    typeof TooltipPrimitive.Root
  >['onOpenChange'];
  open?: React.ComponentProps<typeof TooltipPrimitive.Root>['open'];
  side?: TooltipContentSide;
  size?: TooltipSize;
  triggerClassName?: string;
  triggerType?: 'button' | 'submit';
}>;

export default function Tooltip({
  align = 'center',
  asChild = false,
  children,
  className,
  delayDuration,
  hyphenated = false,
  invert = false,
  label,
  onOpenChange,
  open,
  side = 'top',
  size = 'sm',
  triggerClassName,
  triggerType = 'button', // To prevent clicking on tooltip from submitting if it is within a form.
}: Props) {
  const tooltipBackgroundColor = invert
    ? 'bg-neutral-100 dark:bg-neutral-900'
    : 'bg-neutral-950 dark:bg-neutral-100';
  const tooltipArrowColor = invert
    ? 'fill-neutral-100 dark:fill-neutral-900'
    : 'fill-neutral-950 dark:fill-neutral-100';

  return (
    // TODO: Move to global-level.
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        delayDuration={delayDuration}
        open={open}
        onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger
          asChild={asChild}
          className={triggerClassName}
          type={triggerType}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            align={align}
            className={clsx(
              tooltipContentClassName,
              hyphenated && 'hyphens-auto',
              tooltipBackgroundColor,
              sizeClasses[size],
              fontSizeClasses[size],
              invert ? 'text-neutral-900' : 'text-white',
              'font-medium',
              className,
            )}
            side={side}
            sideOffset={4}>
            {label}
            <TooltipPrimitive.Arrow className={tooltipArrowColor} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
