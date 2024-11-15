import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

export type ProseTextSize = 'custom' | 'md' | 'sm';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: Readonly<{ __html: string }>;
  textSize?: ProseTextSize;
}>;

const textSizes: Record<ProseTextSize, string> = {
  custom: '',
  md: 'text-[15px]',
  sm: 'prose-sm',
};

export function proseStyle(textSize: ProseTextSize = 'md', className?: string) {
  return clsx('prose dark:prose-invert', textSizes[textSize], className);
}

function Prose(
  { children, className, dangerouslySetInnerHTML, textSize = 'md' }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      ref={ref}
      className={proseStyle(textSize, className)}>
      {children}
    </div>
  );
}

export default forwardRef(Prose);
