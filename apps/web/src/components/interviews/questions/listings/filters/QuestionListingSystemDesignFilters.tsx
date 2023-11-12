import clsx from 'clsx';

import type { FilterItemGap } from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { themeDivideColor, themeLineColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type {
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  companyFilterOptions: QuestionFilter<QuestionCompany, QuestionMetadata>;
  companyFilters: Set<QuestionCompany>;
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  difficultyFilterOptions: QuestionFilter<QuestionDifficulty, QuestionMetadata>;
  difficultyFilters: Set<QuestionDifficulty>;
  itemGap: FilterItemGap;
}>;

export default function QuestionListingSystemDesignFilters({
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  itemGap,
}: Props) {
  return (
    <form
      className={clsx(
        'flex flex-col divide-y border-y',
        themeLineColor,
        themeDivideColor,
      )}>
      <QuestionListingFilterItem
        defaultOpen={true}
        itemGap={itemGap}
        section={companyFilterOptions}
        values={companyFilters}
      />
      <QuestionListingFilterItem
        defaultOpen={true}
        itemGap={itemGap}
        section={difficultyFilterOptions}
        values={difficultyFilters}
      />
      <QuestionListingFilterItem
        defaultOpen={true}
        itemGap={itemGap}
        section={completionStatusFilterOptions}
        values={completionStatusFilters}
      />
    </form>
  );
}
