'use client';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsDashboardPrepareQuizPage({
  questions,
  questionCompletionCount,
}: Props) {
  return (
    <QuestionsUnifiedListWithFiltersAndProgress
      filterNamespace="prepare-quiz"
      questionCompletionCount={questionCompletionCount}
      questions={questions}
    />
  );
}
