import clsx from 'clsx';
import React from 'react';

import * as Accordion from '@radix-ui/react-accordion';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}>;

export default function ProjectsMarketingComponentTrackAccordion({
  children,
  className,
  disabled,
}: Props) {
  return (
    <Accordion.Root
      className={clsx(
        'space-y-4',
        disabled && 'pointer-events-none',
        className,
      )}
      disabled={disabled}
      type="multiple">
      {children}
    </Accordion.Root>
  );
}
