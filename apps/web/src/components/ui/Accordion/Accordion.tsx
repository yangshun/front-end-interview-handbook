'use client';

import clsx from 'clsx';
import * as React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { textVariants } from '../Text';
import {
  themeDivideEmphasizeColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryInvertColor,
  themeTextSubtitleColor,
} from '../theme';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={clsx(
      'w-full',
      ['divide-y', themeDivideEmphasizeColor],
      className,
    )}
    {...props}
  />
));

Accordion.displayName = 'AccordionItem';

const AccordionItem = AccordionPrimitive.Item;

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={clsx(
      'flex flex-1 items-center justify-between gap-1 text-left',
      'py-5',
      'group',
      'font-medium transition-all',
      themeOutlineElement_FocusVisible,
      themeOutlineElementBrandColor_FocusVisible,
      themeTextSubtitleColor,
      className,
    )}
    {...props}>
    {children}
    <RiArrowDownSLine
      className={clsx(
        'size-4 shrink-0 transition-transform group-data-[state=open]:-rotate-180',
        themeTextSecondaryInvertColor,
      )}
    />
  </AccordionPrimitive.Trigger>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={clsx(
      'transition-all',
      'data-[state=open]:animate-accordion-down',
      'data-[state=closed]:animate-accordion-up data-[state=closed]:overflow-hidden',
    )}
    {...props}>
    <div
      className={clsx(
        'pb-5',
        textVariants({ color: 'secondary', size: 'body2' }),
        className,
      )}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
