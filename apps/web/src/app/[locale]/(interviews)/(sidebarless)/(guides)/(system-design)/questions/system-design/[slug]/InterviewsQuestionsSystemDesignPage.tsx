'use client';

import { getMDXExport } from 'mdx-bundler/client';

import GuidesMainLayout from '~/components/guides/GuidesMainLayout';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import QuestionPaywall from '~/components/interviews/questions/common/QuestionPaywall';
import type { QuestionSystemDesign } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionContentsSystemDesign from '~/components/interviews/questions/content/system-design/QuestionContentsSystemDesign';
import { ReadyQuestions } from '~/components/interviews/questions/content/system-design/SystemDesignConfig';
import { useSystemDesignNavigation } from '~/components/interviews/questions/content/system-design/SystemDesignNavigation';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  question: QuestionSystemDesign;
}>;

export default function InterviewsQuestionsSystemDesignPage({
  canViewPremiumContent,
  isQuestionLocked,
  question,
}: Props) {
  const isAvailable = ReadyQuestions.includes(question.metadata.slug);

  const tableOfContents =
    question.solution != null
      ? (
          getMDXExport(question.solution) as Readonly<{
            tableOfContents: TableOfContents;
          }>
        ).tableOfContents
      : undefined;

  const navigation = useSystemDesignNavigation();

  return (
    <GuidesMainLayout navigation={navigation} tableOfContents={tableOfContents}>
      {!isAvailable ? (
        <QuestionPaywall
          subtitle="System Design content will be released on a rolling basis. Prices will be increased after System Design content is complete. Subscribe to lifetime today and secure the better deal!"
          title="Coming Soon"
          variant="under_construction"
        />
      ) : (
        <QuestionContentsSystemDesign
          key={question.metadata.slug}
          canViewPremiumContent={canViewPremiumContent}
          isQuestionLocked={isQuestionLocked}
          question={question}
        />
      )}
    </GuidesMainLayout>
  );
}
