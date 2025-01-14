import clsx from 'clsx';
import React from 'react';

import { themeTextSecondaryColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function InterviewsPageLongDescription({ children }: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'w-full lg:max-w-[75%]',
        'text-sm xl:text-base',
        themeTextSecondaryColor,
        'text-pretty',
      )}>
      {children}
    </div>
  );
}
