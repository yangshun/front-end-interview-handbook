'use client';

import clsx from 'clsx';

import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import DashboardStudyGuideList from '~/components/interviews/dashboard/DashboardStudyGuideList';
import DashboardStudyPlansCTA from '~/components/interviews/dashboard/DashboardStudyPlansCTA';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsQuizListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsQuizListWithFiltersAndProgress';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PrepareQuizPage({
  questions,
  questionCompletionCount,
}: Props) {
  const quizSectionItem = useQuizSectionItem();

  return (
    <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
      <div className="xl:col-span-9">
        <QuestionsQuizListWithFiltersAndProgress
          layout="embedded"
          namespace="prepare-quiz"
          questionCompletionCount={questionCompletionCount}
          questions={questions}
        />
      </div>
      <aside
        className={clsx(
          'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
        )}>
        <DashboardStudyPlansCTA />
        <DashboardStudyGuideList
          href={quizSectionItem.href}
          items={[quizSectionItem]}
        />
      </aside>
    </div>
  );
}
