'use client';

import { useIntl } from 'react-intl';

import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparePageLayout from '~/components/questions/dashboard/PreparePageLayout';
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
  questionTotalAvailableCount,
}: Props) {
  const intl = useIntl();
  const quizSectionItem = useQuizSectionItem();

  return (
    <PreparePageLayout
      area="quiz"
      guides={[quizSectionItem]}
      guidesHref={quizSectionItem.href}
      questionTotalAvailableCount={questionTotalAvailableCount}
      title={intl.formatMessage({
        defaultMessage: 'Front End Interview Preparation — Quiz',
        description: 'Prepare for front end interview quiz questions',
        id: 'w5fdO4',
      })}>
      <QuestionsQuizListWithFiltersAndProgress
        layout="embedded"
        namespace="prepare-quiz"
        questionCompletionCount={questionCompletionCount}
        questions={questions}
      />
    </PreparePageLayout>
  );
}
