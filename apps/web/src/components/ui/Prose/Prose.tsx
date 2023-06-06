import clsx from 'clsx';
import { forwardRef } from 'react';

export type ProseTextSize = 'lg' | 'md' | 'sm' | 'xl';

type Props = Readonly<{
  children: React.ReactNode;
  textSize?: ProseTextSize;
}>;

const Prose = forwardRef<HTMLDivElement, Props>(
  ({ textSize = 'md', children }: Props, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'prose',
          // TextClasses[textSize],
          // // Container size.
          // 'max-w-xl',
          // 'sm:max-w-3xl',
          // 'md:max-w-4xl',
          // 'lg:max-w-5xl',
          // // Typography.
          // 'prose-slate',
          // 'text-slate-700',
          // 'prose-strong:font-medium',
          // // Headings.
          // 'prose-h1:font-bold',
          // 'prose-h2:font-bold',
          // 'prose-h3:font-heavymedium',
          // 'prose-h4:font-heavymedium',
          // 'prose-h5:font-medium',
          // 'prose-h6:font-medium',
          // // Lead.
          // 'prose-lead:pb-8',
          // // Paragraph.
          // 'prose-p:font-lightnormal',
          // 'prose-p:pt-1',
          // 'sm:prose-p:pt-2',
          // // Lists.
          // 'prose-li:font-lightnormal',
          // 'prose-ul:font-lightnormal',
          // 'prose-ol:font-lightnormal',

          // // Code.
          // 'prose-code:bg-slate-100',
          // 'prose-code:text-neutral-700',
          // 'prose-code:font-thin',
          // 'prose-code:px-1',
          // 'prose-code:py-0.5',
          // 'prose-code:rounded',
          // 'prose-code:after:content-none',
          // 'prose-code:before:content-none',
          // 'prose-pre:text-xs',
          // // Table.
          // 'prose-table:my-1',
          // 'prose-th:font-medium',
          // 'prose-th:!text-base',
          // 'prose-td:!text-base',
        )}>
        {children}
      </div>
    );
  },
);

export default Prose;
