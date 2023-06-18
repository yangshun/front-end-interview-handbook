import clsx from 'clsx';

import QuestionFilterButton from './QuestionFilterButton';
import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props<T extends string, Q extends QuestionMetadata> = Readonly<{
  limit?: number;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>;

export default function QuestionListingTopicFilters<
  T extends string,
  Q extends QuestionMetadata,
>({ limit = Infinity, section, values }: Props<T, Q>) {
  return (
    <fieldset>
      <legend className="sr-only">{section.name}</legend>
      <div className={clsx('flex flex-wrap items-center gap-2')}>
        {section.options.slice(0, limit).map(({ icon: Icon, ...option }) => (
          <QuestionFilterButton
            key={option.value}
            icon={Icon}
            label={String(option.label)}
            purpose="tab"
            selected={values.has(option.value)}
            tooltip={option.tooltip}
            onClick={() => section.onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
