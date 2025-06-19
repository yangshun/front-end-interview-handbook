import clsx from 'clsx';

import FilterButton from '~/components/ui/FilterButton/FilterButton';

import type { QuestionFormat, QuestionMetadata } from '../../common/QuestionsTypes';
import type { QuestionFilter } from './QuestionFilterType';

type Props = Readonly<{
  formatFilterOptions: QuestionFilter<QuestionFormat, QuestionMetadata>;
  formatFilters: Set<QuestionFormat>;
  formatFiltersUnion: Set<QuestionFormat>;
}>;

export default function QuestionListFilterFormats({
  formatFilterOptions,
  formatFilters,
  formatFiltersUnion,
}: Props) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-2')}>
      {formatFilterOptions.options
        .filter((option) =>
          formatFiltersUnion == null
            ? true
            : formatFiltersUnion?.has(option.value),
        )
        .map(({ icon: Icon, label, tooltip, value }) => (
          <FilterButton
            key={value}
            icon={Icon}
            label={label}
            selected={formatFilters.has(value)}
            size="xs"
            tooltip={tooltip}
            onClick={() => {
              formatFilterOptions.onChange(value);
            }}>
            {label}
          </FilterButton>
        ))}
    </div>
  );
}
