import clsx from 'clsx';

import FilterButton from '~/components/ui/FilterButton/FilterButton';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props<T extends string, Q extends QuestionMetadata> = Readonly<{
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>;

export default function QuestionListingTopicFilters<
  T extends string,
  Q extends QuestionMetadata,
>({ section, values }: Props<T, Q>) {
  return (
    <fieldset>
      <legend className="sr-only">{section.name}</legend>
      <div className={clsx('flex flex-wrap items-center gap-2')}>
        {section.options.map(({ icon: Icon, ...option }) => (
          <FilterButton
            key={option.value}
            icon={Icon}
            label={String(option.label)}
            selected={values.has(option.value)}
            tooltip={option.tooltip}
            onClick={() => section.onChange(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
