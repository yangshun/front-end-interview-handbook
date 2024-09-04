import clsx from 'clsx';

import QuestionListingFilterItem from '~/components/interviews/questions/listings/filters/QuestionListingFilterItem';
import { Accordion } from '~/components/ui/Accordion';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import type {
  QuestionCompletionStatus,
  QuestionImportance,
  QuestionMetadata,
  QuestionMetadataWithCompletedStatus,
  QuestionTopic,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
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
        defaultValue={['topic', 'importance', 'completion']}
        type="multiple">
        <QuestionListingFilterItem
          itemGap={itemGap}
          section={quizTopicFilterOptions}
          values={quizTopicFilters}
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
