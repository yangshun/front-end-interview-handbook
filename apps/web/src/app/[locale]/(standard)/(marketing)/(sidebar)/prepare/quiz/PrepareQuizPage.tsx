'use client';

import { useIntl } from 'react-intl';

import { useQuizSectionItem } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionQuizMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparePageLayout from '~/components/questions/dashboard/PreparePageLayout';
import QuestionsQuizListWithFilters from '~/components/questions/listings/items/QuestionsQuizListWithFilters';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionQuizMetadata>;
}>;

export default function PrepareQuizQuestionsPage({
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const quizSectionItem = useQuizSectionItem();

  return (
    <PreparePageLayout
      area="quiz"
      guides={[quizSectionItem]}
      guidesHref={quizSectionItem.href}
      questionCompletionCount={questionCompletionCount}
      title={intl.formatMessage({
        defaultMessage: 'Front End Interview Preparation — Quiz',
        description: 'Prepare for front end interview quiz questions',
        id: 'w5fdO4',
      })}>
      <QuestionsQuizListWithFilters
        layout="embedded"
        questionCompletionCount={questionCompletionCount}
        questions={questions}
      />
    </PreparePageLayout>
  );
}
