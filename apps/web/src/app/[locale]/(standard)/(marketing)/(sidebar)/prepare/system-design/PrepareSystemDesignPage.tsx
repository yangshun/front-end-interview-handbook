'use client';

import { useIntl } from 'react-intl';

import { useSystemDesignLearningContent } from '~/components/questions/content/system-design/SystemDesignNavigation';
import PreparePageLayout from '~/components/questions/dashboard/PreparePageLayout';
import QuestionsSystemDesignListWithFilters from '~/components/questions/listings/items/QuestionsSystemDesignListWithFilters';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  questionCompletionCount?: QuestionCompletionCount;
}>;

export default function PrepareSystemDesignQuestionsPage({
  questionCompletionCount,
}: Props) {
  const intl = useIntl();
  const systemDesignLearningContent = useSystemDesignLearningContent();

  return (
    <PreparePageLayout
      area="system-design"
      guides={systemDesignLearningContent}
      guidesHref={systemDesignLearningContent[0].href}
      questionCompletionCount={questionCompletionCount}
      title={intl.formatMessage({
        defaultMessage: 'Front End Interview Preparation — Quiz',
        description: 'Prepare for front end interview quiz questions',
        id: 'w5fdO4',
      })}>
      <QuestionsSystemDesignListWithFilters layout="embedded" />
    </PreparePageLayout>
  );
}
