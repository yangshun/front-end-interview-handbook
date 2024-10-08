import clsx from 'clsx';
import React from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

type ScrollSize = 'default' | 'thin';
type Scrollbars = 'both' | 'horizontal' | 'vertical';
type ScrollRadius = 'none' | 'rounded';

type ScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> &
  Readonly<{
    asChild?: boolean;
    heightClass?: string;
    radius?: ScrollRadius;
    scrollbars?: Scrollbars;
    size?: ScrollSize;
    widthClass?: string;
  }>;

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, ...props }, ref) => {
  const {
    asChild,
    size = 'default',
    radius = 'rounded',
    scrollbars = 'vertical',
    heightClass = 'h-full',
    widthClass = 'w-full',
  } = props;

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      asChild={asChild}
      className={clsx('overflow-hidden', widthClass, heightClass, className)}
      {...props}>
      <ScrollAreaPrimitive.Viewport className={clsx("size-full", className)}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar radius={radius} scrollbars={scrollbars} size={size} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

type ScrollBarProps = Readonly<{
  radius: ScrollRadius;
  scrollbars: Scrollbars;
  size: ScrollSize;
}>;

const scrollSizeMap: Record<
  Exclude<Scrollbars, 'both'>,
  Record<ScrollSize, string>
> = {
  horizontal: {
    default: 'h-2.5',
    thin: 'h-2',
  },
  vertical: {
    default: 'w-2.5',
    thin: 'w-2',
  },
};
const borderRadiusMap: Record<ScrollRadius, string> = {
  none: '',
  rounded: 'rounded-full',
};

function ScrollBar({ size, radius, scrollbars }: ScrollBarProps) {
  const horizontalScrollSize = scrollSizeMap.horizontal[size];
  const verticalScrollSize = scrollSizeMap.vertical[size];
  const borderRadius = borderRadiusMap[radius];

  return (
    <>
      {scrollbars !== 'horizontal' && (
        <ScrollAreaPrimitive.Scrollbar
          className={clsx(
            'flex p-0.5',
            'touch-none select-none',
            'transparent',
            verticalScrollSize,
          )}
          orientation="vertical">
          <ScrollThumb className={clsx('flex-1', borderRadius)} />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {scrollbars !== 'vertical' && (
        <ScrollAreaPrimitive.Scrollbar
          className={clsx(
            'flex p-0.5',
            'touch-none select-none',
            'transparent',
            horizontalScrollSize,
          )}
          orientation="horizontal">
          <ScrollThumb className={clsx(borderRadius)} />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {scrollbars === 'both' && <ScrollAreaPrimitive.Corner />}
    </>
  );
}

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

function ScrollThumb({ className }: { className?: string }) {
  return (
    <ScrollAreaPrimitive.Thumb
      className={clsx(
        'relative',
        'bg-neutral-300 dark:bg-neutral-500',
        'before:absolute before:left-1/2 before:top-1/2',
        'before:-translate-x-1/2 before:-translate-y-1/2',
        "before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:content-['']",
        className,
      )}
    />
  );
}

export default ScrollArea;
