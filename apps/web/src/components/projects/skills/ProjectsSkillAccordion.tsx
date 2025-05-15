'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import clsx from 'clsx';
import React from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  defaultValue?: Array<string>;
  disabled?: boolean;
}>;

export default function ProjectsSkillAccordion({
  children,
  className,
  defaultValue,
  disabled,
}: Props) {
  return (
    <AccordionPrimitive.Root
      className={clsx(
        'flex flex-col gap-y-6',
        disabled && 'pointer-events-none',
        className,
      )}
      defaultValue={defaultValue}
      disabled={disabled}
      type="multiple">
      {children}
    </AccordionPrimitive.Root>
  );
}
