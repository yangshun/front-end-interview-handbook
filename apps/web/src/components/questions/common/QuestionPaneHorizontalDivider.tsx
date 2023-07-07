import clsx from 'clsx';
import type { MouseEvent } from 'react';

import { themeLineBackgroundColor } from '~/components/ui/theme';

type Props = Readonly<{
  onMouseDown: (event: MouseEvent<HTMLElement>) => void;
}>;

export default function QuestionPaneHorizontalDivider({ onMouseDown }: Props) {
  return (
    <div
      className={clsx(
        'z-10 -my-0.5 hidden h-[5px] w-full shrink-0 cursor-row-resize border-y-2 bg-clip-padding transition-colors lg:block',
        themeLineBackgroundColor,
        'hover:bg-brand-light dark:hover:bg-brand',
        'hover:border-brand-light dark:hover:border-brand border-transparent',
      )}
      role="presentation"
      onMouseDown={onMouseDown}
    />
  );
}
