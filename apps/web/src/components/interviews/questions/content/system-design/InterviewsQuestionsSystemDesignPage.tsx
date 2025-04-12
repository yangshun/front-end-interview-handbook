'use client';

import { getMDXExport } from 'mdx-bundler/client';
import type { ReactNode } from 'react';

import { useFrontEndSystemDesignPlaybookNavigation } from '~/components/guides/books/front-end-system-design/FrontEndSystemDesignPlaybookNavigation';
import GuidesMainLayout from '~/components/guides/GuidesMainLayout';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type {
  QuestionMetadata,
  QuestionSystemDesign,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { InterviewsQuestionsSystemDesignReady } from '~/components/interviews/questions/content/system-design/InterviewsQuestionsSystemDesignConfig';
import QuestionContentsSystemDesign from '~/components/interviews/questions/content/system-design/QuestionContentsSystemDesign';
import { useIntl } from '~/components/intl';

import { hashQuestion } from '~/db/QuestionsUtils';

type Props = Readonly<{
  bottomNav?: ReactNode;
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  question: QuestionSystemDesign;
  questions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

const guide = 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK';

export default function InterviewsQuestionsSystemDesignPage({
  bottomNav,
  canViewPremiumContent,
  isQuestionLocked,
  question,
  questions,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const isAvailable = InterviewsQuestionsSystemDesignReady.includes(
    question.metadata.slug,
  );

  const tableOfContents =
    question.solution != null
      ? (
          getMDXExport(question.solution) as Readonly<{
            tableOfContents: TableOfContents;
          }>
        ).tableOfContents
      : undefined;

  const navigation = useFrontEndSystemDesignPlaybookNavigation(questions);

  return (
    <GuidesMainLayout
      bottomNav={bottomNav}
      guide={guide}
      navigation={navigation}
      questionMetadata={question.metadata}
      studyListKey={studyListKey}
      tableOfContents={tableOfContents}>
      {!isAvailable ? (
        <InterviewsPurchasePaywall
          subtitle={intl.formatMessage({
            defaultMessage:
              'System Design content will be released on a rolling basis. Prices will be increased after System Design content is complete. Subscribe to lifetime today and secure the better deal!',
            description: 'Question coming soon subtitle',
            id: 'do4njS',
          })}
          title={intl.formatMessage({
            defaultMessage: 'Coming Soon',
            description: 'Coming soon label',
            id: 'jLHxac',
          })}
          variant="under_construction"
        />
      ) : (
        <QuestionContentsSystemDesign
          key={hashQuestion(question.metadata)}
          canViewPremiumContent={canViewPremiumContent}
          isQuestionLocked={isQuestionLocked}
          question={question}
          studyListKey={studyListKey}
        />
      )}
    </GuidesMainLayout>
  );
}
