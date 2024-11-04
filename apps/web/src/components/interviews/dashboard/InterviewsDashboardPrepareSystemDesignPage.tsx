'use client';

import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function InterviewsDashboardPrepareSystemDesignPage({
  questions,
  questionCompletionCount,
}: Props) {
  return (
    <QuestionsUnifiedListWithFiltersAndProgress
      filterNamespace="prepare-system-design"
      questionCompletionCount={questionCompletionCount}
      questions={questions}
    />
  );
}
