'use client';

import { getMDXExport } from 'mdx-bundler/client';

import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import type { QuestionSystemDesign } from '~/components/questions/common/QuestionsTypes';
import QuestionContentsSystemDesign from '~/components/questions/content/system-design/QuestionContentsSystemDesign';
import { ReadyQuestions } from '~/components/questions/content/system-design/SystemDesignContentNavigation';
import SystemDesignLayoutContents from '~/components/questions/content/system-design/SystemDesignLayoutContents';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  isQuestionLocked: boolean;
  question: QuestionSystemDesign;
  serverDuration: number;
}>;

export default function QuestionsSystemDesignPage({
  canViewPremiumContent,
  isQuestionLocked,
  question,
  serverDuration,
}: Props) {
  const isAvailable =
    process.env.NODE_ENV === 'development'
      ? true
      : ReadyQuestions.includes(question.metadata.slug);

  const tableOfContents =
    question.solution != null
      ? (
          getMDXExport(question.solution) as Readonly<{
            tableOfContents: TableOfContents;
          }>
        ).tableOfContents
      : undefined;

  return (
    <SystemDesignLayoutContents
      isComingSoon={!ReadyQuestions.includes(question.metadata.slug)}
      shouldCheckPremium={isAvailable}
      tableOfContents={tableOfContents}>
      {!isAvailable ? (
        canViewPremiumContent ? (
          <EmptyState
            action={
              <Button
                href="/contact"
                label="Subscribe to Updates"
                variant="primary"
              />
            }
            subtitle="System Design content will be released on a rolling basis. Subscribe to the newsletter to receive updates."
            title="Coming Soon"
            variant="under_construction"
          />
        ) : (
          <QuestionPaywall
            subtitle="System Design content will be released on a rolling basis. Prices will be increased after System Design content is complete. Subscribe to lifetime today and secure the better deal!"
            title="Coming Soon"
            variant="under_construction"
          />
        )
      ) : (
        <div className="pt-2 sm:pt-4">
          <QuestionContentsSystemDesign
            key={question.metadata.slug}
            canViewPremiumContent={canViewPremiumContent}
            hasCompletedQuestion={false}
            isQuestionLocked={isQuestionLocked}
            question={question}
            serverDuration={serverDuration}
          />
        </div>
      )}
    </SystemDesignLayoutContents>
  );
}
