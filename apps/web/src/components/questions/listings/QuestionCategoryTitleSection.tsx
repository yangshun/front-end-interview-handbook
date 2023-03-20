import clsx from 'clsx';

import TextPairing from '~/components/common/TextPairing';
import { QuestionCount } from '~/components/questions/listings/QuestionCount';
import Anchor from '~/components/ui/Anchor';

import type { QuestionListCategory } from './types';

type CategoryValue = QuestionListCategory | 'react';

type Props = Readonly<{
  category: CategoryValue;
}>;

const items: ReadonlyArray<{
  label: string;
  value: CategoryValue;
}> = [
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'HTML',
    value: 'html',
  },
  {
    label: 'CSS',
    value: 'css',
  },
  {
    label: 'React',
    value: 'react',
  },
];

export default function QuestionCategoryTitleSection({ category }: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <TextPairing
        description={
          <>
            Practice {QuestionCount}+ common front end interview questions
            across every major front end framework. Reference answers from
            ex-interviewers at FAANG.
          </>
        }
        sectionLabel={
          <>
            Front End Engineer &middot; Web Developer &middot; Full Stack
            Engineer
          </>
        }
        size="lg"
        title="Interview Practice Question Bank"
      />
      <div className="relative flex flex-wrap gap-3">
        {items.map(({ label, value }) => (
          <Anchor
            key={value}
            className={clsx(
              'rounded-full border border-slate-200 px-8 py-2 text-xs font-medium sm:text-sm',
              value === category ? 'bg-brand-100' : 'hover:bg-slate-50',
            )}
            href={`/questions/${value}`}
            variant="unstyled">
            {label}
          </Anchor>
        ))}
      </div>
    </div>
  );
}
