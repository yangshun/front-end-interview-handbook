'use client';

import clsx from 'clsx';

import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import PreparationStudyPlansCTA from '~/components/questions/dashboard/PreparationStudyPlansCTA';
import QuestionsQuizListWithFiltersAndProgress from '~/components/questions/listings/items/QuestionsQuizListWithFiltersAndProgress';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  questions: ReadonlyArray<QuestionQuizMetadata>;
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
        <PreparationStudyPlansCTA />
        <PreparationStudyGuideList
          href={quizSectionItem.href}
          items={[quizSectionItem]}
        />
      </aside>
    </div>
  );
}
