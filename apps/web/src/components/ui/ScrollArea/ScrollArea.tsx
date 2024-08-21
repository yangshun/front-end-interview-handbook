import clsx from 'clsx';
import React from 'react';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={clsx('h-full grow overflow-hidden', className)}
    {...props}>
    <ScrollAreaPrimitive.Viewport className="size-full">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    className={clsx(
      'flex w-2.5 p-0.5',
      'select-non touch-none',
      'transparent',
      className,
    )}
    orientation={orientation}
    {...props}>
    <ScrollAreaPrimitive.Thumb
      className={clsx(
        'relative flex-1 rounded-full',
        'bg-neutral-300 dark:bg-neutral-500',
        'before:absolute before:left-1/2 before:top-1/2',
        'before:-translate-x-1/2 before:-translate-y-1/2',
        "before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:content-['']",
      )}
    />
  </ScrollAreaPrimitive.Scrollbar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
