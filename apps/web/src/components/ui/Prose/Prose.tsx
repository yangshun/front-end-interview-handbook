import clsx from 'clsx';
import { forwardRef } from 'react';

type ProseTextSize = 'md' | 'sm';

type Props = Readonly<{
  children: React.ReactNode;
  textSize?: ProseTextSize;
}>;

const textSizes: Record<ProseTextSize, string> = {
  md: '',
  sm: 'prose-sm',
};

const Prose = forwardRef<HTMLDivElement, Props>(
  ({ children, textSize = 'md' }: Props, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('prose dark:prose-invert', textSizes[textSize])}>
        {children}
      </div>
    );
  },
);

export default Prose;
