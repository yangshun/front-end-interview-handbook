'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { TextSize } from '../Text';
import Text from '../Text';

import {
  Tooltip as ArkTooltip,
  TooltipArrow as ArkTooltipArrow,
  TooltipContent as ArkTooltipContent,
  TooltipPositioner as ArkTooltipPositioner,
  TooltipTrigger as ArkTooltipTrigger,
} from '@ark-ui/react';

export type TooltipAlignment = 'bottom' | 'center' | 'end' | 'start' | 'top';
export type TooltipPosition = 'above' | 'below' | 'end' | 'start';
export type TooltipSize = 'md' | 'sm';

type TooltipLabelProps = Readonly<{
  children: ReactNode;
  invert: boolean;
  size: TooltipSize;
}>;

type TooltipArrowProps = Readonly<{
  alignment: TooltipAlignment;
  invert: boolean;
  position: TooltipPosition;
}>;

function getTooltipBackgroundColor(invert: boolean) {
  const tooltipBackgroundColor = invert
    ? 'bg-neutral-200 dark:bg-neutral-900'
    : 'bg-neutral-950 dark:bg-neutral-200';

  return tooltipBackgroundColor;
}

const sizeClasses: Record<TooltipSize, string> = {
  md: 'p-3',
  sm: 'p-2',
};

const fontSizeClasses: Record<TooltipSize, TextSize> = {
  md: 'body2',
  sm: 'body3',
};

function TooltipArrow({ position, alignment, invert }: TooltipArrowProps) {
  const tooltipBackgroundColor = getTooltipBackgroundColor(invert);
  const shouldUseXAlignment = position === 'above' || position === 'below';
  const shouldUseYAlignment = position === 'start' || position === 'end';

  return (
    <div
      aria-hidden="true"
      className={clsx(
        'absolute h-2 w-2 rounded-[1px]',
        tooltipBackgroundColor,
        position === 'above' && '-bottom-[3px]',
        position === 'below' && '-top-[3px]',
        position === 'start' && '-right-[3px]',
        position === 'end' && '-left-[3px]',
        shouldUseXAlignment &&
          alignment === 'center' &&
          'left-0 right-0 mx-auto',
        shouldUseXAlignment && alignment === 'start' && 'left-2',
        shouldUseXAlignment && alignment === 'end' && 'right-2',
        shouldUseYAlignment && 'bottom-0 top-0 my-auto',
      )}
      style={{
        // Have to use inline styles to rotate then scale
        transform: shouldUseXAlignment
          ? 'scaleX(1.3) rotate(45deg)'
          : 'scaleY(1.3) rotate(45deg)',
      }}
    />
  );
}

function TooltipLabel({ children, invert, size }: TooltipLabelProps) {
  const tooltipBackgroundColor = getTooltipBackgroundColor(invert);

  return (
    <ArkTooltipContent
      className={clsx(
        'rounded',
        sizeClasses[size],
        tooltipBackgroundColor,
        'max-w-xs',
      )}>
      <Text
        color={invert ? undefined : 'invert'}
        display="block"
        size={fontSizeClasses[size]}
        weight="medium">
        {children}
      </Text>
    </ArkTooltipContent>
  );
}

type Props = Readonly<{
  alignment?: TooltipAlignment;
  children: ReactNode;
  className?: string;
  invert?: boolean;
  label?: ReactNode;
  position?: TooltipPosition;
  size?: TooltipSize;
}>;

export default function Tooltip({
  alignment = 'center',
  children,
  className,
  invert = false,
  label,
  size = 'sm',
  position = 'above',
}: Props) {
  return (
    <ArkTooltip
      positioning={{
        fitViewport: false,
        placement:
          position === 'below'
            ? alignment === 'start'
              ? 'bottom-start'
              : alignment === 'end'
              ? 'bottom-end'
              : 'bottom'
            : position === 'above'
            ? alignment === 'start'
              ? 'top-start'
              : alignment === 'end'
              ? 'top-end'
              : 'top'
            : position === 'start'
            ? alignment === 'top'
              ? 'left-start'
              : alignment === 'bottom'
              ? 'left-end'
              : 'left'
            : alignment === 'top'
            ? 'right-start'
            : alignment === 'bottom'
            ? 'right-end'
            : 'right',
      }}>
      <ArkTooltipTrigger>
        <span className={className}>{children}</span>
      </ArkTooltipTrigger>
      <ArkTooltipPositioner className="relative">
        <ArkTooltipArrow className="contents">
          <TooltipArrow
            alignment={alignment}
            invert={invert}
            position={position}
          />
        </ArkTooltipArrow>
        <TooltipLabel invert={invert} size={size}>
          {label}
        </TooltipLabel>
      </ArkTooltipPositioner>
    </ArkTooltip>
  );
}
