import clsx from 'clsx';

import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { Accordion } from '~/components/ui/Accordion';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import type {
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionImportance,
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
  importanceFilterOptions: QuestionFilter<QuestionImportance, QuestionMetadata>;
  importanceFilters: Set<QuestionImportance>;
  itemGap: QuestionFilterItemGap;
}>;

export default function QuestionListingSystemDesignFilters({
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  importanceFilterOptions,
  importanceFilters,
  itemGap,
}: Props) {
  return (
    <form>
      <Accordion
        className={clsx('border-y', themeBorderElementColor)}
        defaultValue={[
          companyFilterOptions.id,
          difficultyFilterOptions.id,
          importanceFilterOptions.id,
          completionStatusFilterOptions.id,
        ]}
        type="multiple">
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={companyFilterOptions}
          values={companyFilters}
        />
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={difficultyFilterOptions}
          values={difficultyFilters}
        />
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={importanceFilterOptions}
          values={importanceFilters}
        />
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={completionStatusFilterOptions}
          values={completionStatusFilters}
        />
      </Accordion>
    </form>
  );
}
