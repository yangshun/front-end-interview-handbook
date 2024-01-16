import clsx from 'clsx';
import { forwardRef } from 'react';

export type ProseTextSize = 'md' | 'sm';

type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: Readonly<{ __html: string }>;
  textSize?: ProseTextSize;
}>;

const textSizes: Record<ProseTextSize, string> = {
  md: '',
  sm: 'prose-sm',
};

const Prose = forwardRef<HTMLDivElement, Props>(
  (
    { children, className, dangerouslySetInnerHTML, textSize = 'md' }: Props,
    ref,
  ) => {
    return (
      <div
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        ref={ref}
        className={clsx(
          'prose dark:prose-invert',
          textSizes[textSize],
          className,
        )}>
        {children}
      </div>
    );
  },
);

export default Prose;
