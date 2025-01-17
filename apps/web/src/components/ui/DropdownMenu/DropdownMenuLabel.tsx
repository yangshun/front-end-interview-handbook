import clsx from 'clsx';
import React from 'react';

import { textVariants } from '../Text';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function DropdownMenuLabel({ children }: Props) {
  return (
    <DropdownMenuPrimitive.Label
      className={clsx(
        'px-2 py-1',
        textVariants({
          color: 'default',
          size: 'body3',
          weight: 'medium',
        }),
      )}>
      {children}
    </DropdownMenuPrimitive.Label>
  );
}
