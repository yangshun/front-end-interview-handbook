'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { TextSize } from '../Text';
import Text from '../Text';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export type TooltipContentAlignment = 'center' | 'end' | 'start';
export type TooltipContentSide = 'bottom' | 'left' | 'right' | 'top';
export type TooltipSize = 'md' | 'sm';

const sizeClasses: Record<TooltipSize, string> = {
  md: 'p-3',
  sm: 'p-2',
};

const fontSizeClasses: Record<TooltipSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
};

type Props = Readonly<{
  align?: TooltipContentAlignment;
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  invert?: boolean;
  label?: ReactNode;
  side?: TooltipContentSide;
  size?: TooltipSize;
}>;

export default function Tooltip({
  align = 'center',
  asChild = false,
  children,
  className,
  invert = false,
  label,
  side = 'top',
  size = 'sm',
}: Props) {
  const tooltipBackgroundColor = invert
    ? 'bg-neutral-200 dark:bg-neutral-900'
    : 'bg-neutral-950 dark:bg-neutral-200';
  const tooltipArrowColor = invert
    ? 'fill-neutral-200 dark:fill-neutral-900'
    : 'fill-neutral-950 dark:fill-neutral-200';

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild={asChild}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            align={align}
            className={clsx(
              'select-none',
              'rounded',
              'z-[100]',
              'max-w-64',
              tooltipBackgroundColor,
              sizeClasses[size],
              className,
            )}
            side={side}
            sideOffset={4}>
            <Text
              color={invert ? undefined : 'invert'}
              display="block"
              size={fontSizeClasses[size]}
              weight="medium">
              {label}
            </Text>
            <TooltipPrimitive.Arrow className={tooltipArrowColor} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
