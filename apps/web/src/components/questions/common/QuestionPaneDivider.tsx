import type { MouseEvent } from 'react';

type Props = Readonly<{
  onMouseDown: (event: MouseEvent<HTMLElement>) => void;
}>;

export default function QuestionPaneDivider({ onMouseDown }: Props) {
  return (
    <div
      className="hover:border-brand-light hover:bg-brand-light z-10 -mx-0.5 hidden h-full w-[5px] shrink-0 cursor-col-resize border-x-2 border-transparent bg-neutral-200 bg-clip-padding transition-colors lg:block"
      role="presentation"
      onMouseDown={onMouseDown}
    />
  );
}
