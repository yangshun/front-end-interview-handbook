import clsx from 'clsx';
import { forwardRef } from 'react';

export type ProseTextSize = 'lg' | 'md' | 'sm' | 'xl';

type Props = Readonly<{
  children: React.ReactNode;
  textSize?: ProseTextSize;
}>;

const textClasses: Record<ProseTextSize, string> = {
  lg: clsx(
    'prose-lg',
    // Headings.
    'prose-headings:text-xl',
    'prose-headings:pt-1',
    'sm:prose-headings:text-xl',
    'sm:prose-headings:pt-2',

    'prose-h1:text-2xl',
    'sm:prose-h1:text-3xl',
    'md:prose-h1:text-4xl',

    'prose-h2:text-xl',
    'sm:prose-h2:text-2xl',
    'md:prose-h2:text-2xl',

    'prose-h3:text-xl',
    'sm:prose-h3:text-xl',

    'prose-h4:text-lg',
    'sm:prose-h4:text-xl',
    // Lead.
    'prose-lead:text-lg',
    'prose-lead:!leading-8',
    'prose-lead:text-slate-800',
    'sm:prose-lead:text-xl',
    'sm:prose-lead:!leading-9',
    '2xl:prose-lead:!leading-10',
    // Paragraph.
    'prose-p:text-md',
    'prose-p:!leading-8',
    'sm:prose-p:text-lg',
    'sm:prose-p:!leading-9',
    '2xl:prose-p:!leading-10',
    // Lists.
    'prose-li:text-md',
    'prose-li:!leading-8',
    'sm:prose-li:text-lg',
    'sm:prose-li:!leading-9',
    '2xl:prose-li:!leading-10',

    'prose-ol:text-md',
    'prose-ol:!leading-8',
    'sm:prose-ol:text-lg',
    'sm:prose-ol:!leading-9',
    '2xl:prose-ol:!leading-10',

    'prose-ul:text-md',
    'prose-ul:!leading-8',
    'sm:prose-ul:text-lg',
    'sm:prose-ul:!leading-9',
    '2xl:prose-ul:!leading-10',
  ),
  md: 'prose-base',
  sm: 'prose-sm',
  xl: clsx(
    'prose-xl',
    // Headings.
    'prose-headings:text-1.5xl',
    'prose-headings:pt-2',
    'sm:prose-headings:text-xl',
    'sm:prose-headings:pt-4',

    'prose-h1:text-3xl',
    'sm:prose-h1:text-4xl',
    'md:prose-h1:text-4xl',

    'prose-h2:text-2xl',
    'sm:prose-h2:text-3xl',
    'md:prose-h2:text-3xl',

    'prose-h3:text-1.5xl',
    'sm:prose-h3:text-2xl',

    'prose-h4:text-xl',
    'sm:prose-h4:text-1.5xl',
    // Lead.
    'prose-lead:text-lg',
    'prose-lead:!leading-8',
    'prose-lead:text-slate-800',
    'sm:prose-lead:text-xl',
    'sm:prose-lead:!leading-9',
    '2xl:prose-lead:!leading-10',
    // Paragraph.
    'prose-p:text-base',
    'prose-p:!leading-8',
    'sm:prose-p:text-lg',
    'sm:prose-p:!leading-9',
    '2xl:prose-p:!leading-10',
    // Lists.
    'prose-li:text-base',
    'prose-li:!leading-8',
    'sm:prose-li:text-lg',
    'sm:prose-li:!leading-9',
    '2xl:prose-li:!leading-10',

    'prose-ol:text-base',
    'prose-ol:!leading-8',
    'sm:prose-ol:text-lg',
    'sm:prose-ol:!leading-9',
    '2xl:prose-ol:!leading-10',

    'prose-ul:text-base',
    'prose-ul:!leading-8',
    'sm:prose-ul:text-lg',
    'sm:prose-ul:!leading-9',
    '2xl:prose-ul:!leading-10',
  ),
};

const Prose = forwardRef<HTMLDivElement, Props>(
  ({ textSize = 'md', children }: Props, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'prose',
          textClasses[textSize],
          // Container size.
          'max-w-xl',
          'sm:max-w-3xl',
          'md:max-w-4xl',
          'lg:max-w-5xl',
          // Typography.
          'prose-slate',
          'text-slate-700',
          'prose-strong:font-medium',
          // Headings.
          'prose-h1:font-bold',
          'prose-h2:font-bold',
          'prose-h3:font-heavymedium',
          'prose-h4:font-heavymedium',
          'prose-h5:font-medium',
          'prose-h6:font-medium',
          // Lead.
          'prose-lead:pb-8',
          // Paragraph.
          'prose-p:font-lightnormal',
          'prose-p:pt-1',
          'sm:prose-p:pt-2',
          // Lists.
          'prose-li:font-lightnormal',
          'prose-ul:font-lightnormal',
          'prose-ol:font-lightnormal',

          // Code.
          'prose-code:bg-slate-100',
          'prose-code:text-neutral-700',
          'prose-code:font-thin',
          'prose-code:px-1',
          'prose-code:py-0.5',
          'prose-code:rounded',
          'prose-code:after:content-none',
          'prose-code:before:content-none',
          'prose-pre:text-xs',
          // Table.
          'prose-table:my-1',
          'prose-th:font-medium',
          'prose-th:!text-base',
          'prose-td:!text-base',
        )}>
        {children}
      </div>
    );
  },
);

export default Prose;
