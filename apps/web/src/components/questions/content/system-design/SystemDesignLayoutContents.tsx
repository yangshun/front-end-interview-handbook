'use client';

import { useI18nPathname } from 'next-i18nostic';
import { useRef } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import GuidesHeadingObserver from '~/components/guides/GuidesHeadingObserver';
import type { TableOfContents } from '~/components/guides/GuidesTableOfContents';
import GuidesTableOfContents from '~/components/guides/GuidesTableOfContents';
import QuestionPaywall from '~/components/questions/common/QuestionPaywall';
import { useSystemDesignNavigation } from '~/components/questions/content/system-design/SystemDesignContentNavigation';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionPagination from '../QuestionPagination';

type Props = Readonly<{
  children?: React.ReactNode;
  isComingSoon?: boolean;
  shouldCheckPremium?: boolean;
  tableOfContents?: TableOfContents;
}>;

export default function SystemDesignLayoutContents({
  children,
  isComingSoon = false,
  shouldCheckPremium = true,
  tableOfContents,
}: Props) {
  const { pathname } = useI18nPathname();
  const { userProfile } = useUserProfile();
  const isPremiumUser = userProfile?.isPremium ?? false;
  const systemDesignNavigation = useSystemDesignNavigation();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  // NOTE: This only flattens one layer,  so it doesn't work if the navigation
  // has many layers. Refer to GuidesLayout for a more flexible approach.
  const flatNavigationItems = systemDesignNavigation
    .map((section) =>
      section.links.map((link) => ({ ...link, section: section.title })),
    )
    .flat();

  const currentItem = flatNavigationItems.filter(
    (item) => item.href === pathname,
  )[0];

  const canSeePremiumContents =
    !currentItem.premium || (currentItem.premium && isPremiumUser);

  return (
    <GuidesHeadingObserver
      articleContainerRef={articleContainerRef}
      headingSelectors={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}>
      <div className="flex w-0 grow">
        <div
          ref={articleContainerRef}
          className="mx-auto w-full max-w-xl space-y-6 overflow-auto px-4 py-12 sm:max-w-3xl sm:px-10 md:max-w-4xl 2xl:max-w-5xl">
          <div className="-mb-4 flex flex-wrap gap-x-2 text-sm text-slate-500">
            <span>Front End System Design Guidebook</span>
            <span>/</span>
            <span>{currentItem.section}</span>
            <span>/</span>
            <span>{currentItem.title}</span>
          </div>
          {(() => {
            if (!shouldCheckPremium || canSeePremiumContents) {
              return children;
            }

            // From this point on the content is premium.
            return isComingSoon ? (
              <QuestionPaywall
                subtitle="System Design content will be released on a rolling basis. Purchase premium to unlock full access to exclusive System Design content including an interview guide, high quality solutions and companies which ask this question."
                title="Premium Content Coming Soon"
                variant="under_construction"
              />
            ) : (
              <QuestionPaywall
                subtitle="Purchase premium to unlock full access to exclusive System Design content including high quality solutions and companies which ask this question."
                title="Premium Content"
              />
            );
          })()}
          <Section>
            <QuestionPagination
              currentHref={pathname ?? ''}
              items={flatNavigationItems}
            />
          </Section>
        </div>
        {tableOfContents && (
          <Section>
            <div
              key={currentItem?.href}
              className="hidden xl:sticky xl:block xl:flex-none xl:overflow-y-auto xl:overflow-x-hidden xl:py-12 xl:px-6"
              style={{
                height: `calc(100dvh - var(--navbar-height))`,
                top: `var(--navbar-height)`,
              }}>
              <GuidesTableOfContents tableOfContents={tableOfContents} />
            </div>
          </Section>
        )}
      </div>
    </GuidesHeadingObserver>
  );
}
