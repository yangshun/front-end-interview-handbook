'use client';

import { useIntl } from 'react-intl';

import { useCodingQuestionListGuideItems } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparePageLayout from '~/components/questions/dashboard/PreparePageLayout';
import QuestionsCodingListWithFilters from '~/components/questions/listings/items/QuestionsCodingListWithFilters';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
  questions: ReadonlyArray<QuestionMetadata>;
}>;

export default function PrepareCodingQuestionsPage({
  questions,
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const codingQuestionListGuideItems = useCodingQuestionListGuideItems();

  return (
    <PreparePageLayout
      area="coding"
      guides={codingQuestionListGuideItems}
      guidesHref={codingQuestionListGuideItems[0].href}
      questionCompletionCount={questionCompletionCount}
      title={intl.formatMessage({
        defaultMessage: 'Front End Interview Preparation — Coding',
        description: 'Prepare for front end interview coding questions',
        id: '7H/tqa',
      })}>
      <QuestionsCodingListWithFilters
        layout="embedded"
        questionCompletionCount={questionCompletionCount}
        questions={questions}
      />
    </PreparePageLayout>
  );
}
