import clsx from 'clsx';
import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  defaultValue?: Array<string>;
  disabled?: boolean;
}>;

export default function ProjectsTrackAccordion({
  children,
  className,
  defaultValue,
  disabled,
}: Props) {
  return (
    <Accordion.Root
      className={clsx(
        'flex flex-col gap-y-6',
        disabled && 'pointer-events-none',
        className,
      )}
      defaultValue={defaultValue}
      disabled={disabled}
      type="multiple">
      {children}
    </Accordion.Root>
  );
}
