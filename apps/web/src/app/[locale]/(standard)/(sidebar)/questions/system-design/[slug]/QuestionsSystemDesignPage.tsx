'use client';

import { getMDXExport } from 'mdx-bundler/client';
import { useI18nPathname } from 'next-i18nostic';

import GuidesMainLayout from '~/components/guides/GuidesMainLayout';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import useFlattenedNavigationItems from '~/components/guides/useFlattenedNavigationItems';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import type { QuestionSystemDesign } from '~/components/questions/common/QuestionsTypes';
import QuestionContentsSystemDesign from '~/components/questions/content/system-design/QuestionContentsSystemDesign';
import {
  ReadyQuestions,
  useSystemDesignNavigation,
} from '~/components/questions/content/system-design/SystemDesignNavigation';
import SystemDesignPaywall from '~/components/questions/content/system-design/SystemDesignPaywall';
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

  const { pathname } = useI18nPathname();
  const navigation = useSystemDesignNavigation();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  const isComingSoon = !ReadyQuestions.includes(question.metadata.slug);
  const shouldCheckPremium = isAvailable;

  return (
    <GuidesMainLayout navigation={navigation} tableOfContents={tableOfContents}>
      <SystemDesignPaywall
        isComingSoon={isComingSoon}
        isPremium={currentItem.premium}
        shouldCheckPremium={shouldCheckPremium}>
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
      </SystemDesignPaywall>
    </GuidesMainLayout>
  );
}
