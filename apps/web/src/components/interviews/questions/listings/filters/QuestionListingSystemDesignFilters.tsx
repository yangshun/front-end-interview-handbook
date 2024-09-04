import clsx from 'clsx';

import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { Accordion } from '~/components/ui/Accordion';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionsListAttributesUnion } from './QuestionsProcessor';
import type {
  QuestionCompany,
  QuestionCompletionStatus,
  QuestionDifficulty,
  QuestionImportance,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  attributesUnion: QuestionsListAttributesUnion;
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
}>;

export default function QuestionListingSystemDesignFilters({
  attributesUnion,
  companyFilterOptions,
  companyFilters,
  completionStatusFilterOptions,
  completionStatusFilters,
  difficultyFilterOptions,
  difficultyFilters,
  importanceFilterOptions,
  importanceFilters,
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
          section={companyFilterOptions}
          values={companyFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.difficulty}
          section={difficultyFilterOptions}
          values={difficultyFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.importance}
          section={importanceFilterOptions}
          values={importanceFilters}
        />
        <QuestionListingFilterItem
          section={completionStatusFilterOptions}
          values={completionStatusFilters}
        />
      </Accordion>
    </form>
  );
}
