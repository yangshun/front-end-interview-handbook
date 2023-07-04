'use client';

import clsx from 'clsx';

import PreparationStudyGuideList from '~/components/dashboard/DashboardStudyGuideList';
import DashboardStudyPlansCTA from '~/components/dashboard/DashboardStudyPlansCTA';
import { useCodingQuestionListGuideItems } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionsCodingListWithFiltersAndProgress from '~/components/questions/listings/items/QuestionsCodingListWithFiltersAndProgress';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PrepareCodingQuestionsPage({
  questions,
  questionCompletionCount,
}: Props) {
  const codingQuestionListGuideItems = useCodingQuestionListGuideItems();

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
      <div className="xl:col-span-9">
        <QuestionsCodingListWithFiltersAndProgress
          layout="embedded"
          namespace="prepare-coding"
          questionCompletionCount={questionCompletionCount}
          questions={questions}
        />
      </div>
      <aside
        className={clsx(
          'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
        )}>
        <DashboardStudyPlansCTA />
        <PreparationStudyGuideList
          href={codingQuestionListGuideItems[0].href}
          items={codingQuestionListGuideItems}
        />
      </aside>
    </div>
  );
}
