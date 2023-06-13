import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeLineColor } from '~/components/ui/theme';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function CodingWorkspaceToolbar({ children }: Props) {
  return (
    <div
      className={clsx(
        'flex justify-end gap-2 border-b py-3 px-4 sm:px-6 lg:px-2 lg:py-2',
        themeLineColor,
      )}>
      {children}
    </div>
  );
}
