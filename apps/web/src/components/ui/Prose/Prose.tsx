import clsx from 'clsx';
import { forwardRef } from 'react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Prose = forwardRef<HTMLDivElement, Props>(({ children }: Props, ref) => {
  return (
    <div ref={ref} className={clsx('prose dark:prose-invert')}>
      {children}
    </div>
  );
});

export default Prose;
