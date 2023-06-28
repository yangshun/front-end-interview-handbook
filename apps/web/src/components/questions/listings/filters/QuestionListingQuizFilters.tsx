import clsx from 'clsx';

import type { FilterItemGap } from '~/components/questions/listings/filters/QuestionListingFilterItem';
import QuestionListingFilterItem from '~/components/questions/listings/filters/QuestionListingFilterItem';
import { themeDivideColor, themeLineColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type {
  QuestionCompletionStatus,
  QuestionMetadataWithCompletedStatus,
  QuestionQuizMetadata,
  QuestionQuizTopic,
} from '../../common/QuestionsTypes';

type Props = Readonly<{
  completionStatusFilterOptions: QuestionFilter<
    QuestionCompletionStatus,
    QuestionMetadataWithCompletedStatus
  >;
  completionStatusFilters: Set<QuestionCompletionStatus>;
  itemGap: FilterItemGap;
  mode?: 'default' | 'topic';
  quizTopicFilterOptions: QuestionFilter<
    QuestionQuizTopic,
    QuestionQuizMetadata
  >;
  quizTopicFilters: Set<QuestionQuizTopic>;
}>;

export default function QuestionListingQuizFilters({
  completionStatusFilterOptions,
  completionStatusFilters,
  mode,
  itemGap,
  quizTopicFilterOptions,
  quizTopicFilters,
}: Props) {
  return (
    <form
      className={clsx(
        'flex flex-col divide-y border-y',
        themeLineColor,
        themeDivideColor,
      )}>
      {mode !== 'topic' && (
        <QuestionListingFilterItem
          defaultOpen={true}
          itemGap={itemGap}
          section={quizTopicFilterOptions}
          values={quizTopicFilters}
        />
      )}
      <QuestionListingFilterItem
        defaultOpen={true}
        itemGap={itemGap}
        section={completionStatusFilterOptions}
        values={completionStatusFilters}
      />
    </form>
  );
}
