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
  itemGap: QuestionFilterItemGap;
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
    <form>
      <Accordion
        className={clsx('border-y', themeBorderElementColor)}
        defaultValue={['company', 'difficulty', 'completion']}
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
          section={completionStatusFilterOptions}
          values={completionStatusFilters}
        />
      </Accordion>
    </form>
  );
}
