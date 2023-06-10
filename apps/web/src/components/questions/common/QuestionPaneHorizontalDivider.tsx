import type { MouseEvent } from 'react';

type Props = Readonly<{
  onMouseDown: (event: MouseEvent<HTMLElement>) => void;
}>;

export default function QuestionPaneHorizontalDivider({ onMouseDown }: Props) {
  return (
    <div
      className="hover:border-brand-400 hover:bg-brand-400 z-10 -my-0.5 hidden h-[5px] w-full shrink-0 cursor-row-resize border-y-2 border-transparent bg-neutral-200 bg-clip-padding transition-colors lg:block"
      role="presentation"
      onMouseDown={onMouseDown}
    />
  );
}
