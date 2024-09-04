import clsx from 'clsx';

import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { Accordion } from '~/components/ui/Accordion';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import type { QuestionsListAttributesUnion } from './QuestionsProcessor';
import type {
  QuestionCompletionStatus,
  QuestionImportance,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionTopic,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  attributesUnion: QuestionsListAttributesUnion;
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  importanceFilterOptions: QuestionFilter<QuestionImportance, QuestionMetadata>;
  importanceFilters: Set<QuestionImportance>;
  itemGap: QuestionFilterItemGap;
  quizTopicFilterOptions: QuestionFilter<QuestionTopic, QuestionMetadata>;
  quizTopicFilters: Set<QuestionTopic>;
}>;

export default function QuestionListingQuizFilters({
  attributesUnion,
  completionStatusFilterOptions,
  completionStatusFilters,
  itemGap,
  quizTopicFilterOptions,
  quizTopicFilters,
  importanceFilterOptions,
  importanceFilters,
}: Props) {
  return (
    <form>
      <Accordion
        className={clsx('border-y', themeBorderElementColor)}
        defaultValue={[
          quizTopicFilterOptions.id,
          importanceFilterOptions.id,
          completionStatusFilterOptions.id,
        ]}
        type="multiple">
        <QuestionListingFilterItem
          coveredValues={attributesUnion.topics}
          itemGap={itemGap}
          section={quizTopicFilterOptions}
          values={quizTopicFilters}
        />
        <QuestionListingFilterItem
          coveredValues={attributesUnion.importance}
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
