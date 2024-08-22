import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeTextTitleColor } from '../theme';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function Abstract({ children }: Props) {
  return (
    <div className={clsx('text-base', themeTextTitleColor)}>{children}</div>
  );
}
