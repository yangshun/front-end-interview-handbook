'use client';

import clsx from 'clsx';
import * as React from 'react';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

const Hovercard = HoverCardPrimitive.Root;

const HovercardTrigger = HoverCardPrimitive.Trigger;

const HovercardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    className={clsx(
      'animate-in zoom-in-90 z-50 rounded-md border border-slate-100 bg-white shadow-md outline-none',
      className,
    )}
    sideOffset={sideOffset}
    {...props}
  />
));

HovercardContent.displayName = HoverCardPrimitive.Content.displayName;

export { Hovercard, HovercardContent, HovercardTrigger };
