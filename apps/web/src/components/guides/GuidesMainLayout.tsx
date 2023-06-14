'use client';

import { Fragment, useRef } from 'react';

import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import type { GuideNavigation } from './GuidesLayoutSidebar';
import GuidesNavbar from './GuidesNavbar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import FooterlessContainerHeight from '../common/FooterlessContainerHeight';
import QuestionPagination from '../questions/content/QuestionPagination';
import Text from '../ui/Text';

type Props = Readonly<{
  children?: React.ReactNode;
  isAccessibleForFree?: boolean;
  navigation: GuideNavigation; // TODO: Consider reading from context instead.
  tableOfContents?: TableOfContents;
}>;

export default function GuidesMainLayout({
  children,
  navigation,
  tableOfContents,
}: Props) {
  const { pathname } = useI18nPathname();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  return (
    <GuidesHeadingObserver
      articleContainerRef={articleContainerRef}
      headingSelectors={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}>
      <div className="w-full">
        <GuidesNavbar
          navigation={navigation}
          tableOfContents={tableOfContents}
        />
        <div className="flex grow">
          <div className="mx-auto grid w-full max-w-xl gap-6 overflow-auto px-4 py-12 sm:max-w-3xl sm:px-6 md:max-w-4xl lg:px-8 2xl:max-w-5xl">
            {currentItem && (
              <div className="-mb-4 flex flex-wrap gap-x-2">
                {currentItem.breadcrumbs.map((breadcrumb, index) => (
                  <Fragment key={breadcrumb}>
                    {index > 0 && (
                      <Text color="secondary" size="body2">
                        /
                      </Text>
                    )}
                    <Text color="secondary" size="body2">
                      {breadcrumb}
                    </Text>
                  </Fragment>
                ))}
              </div>
            )}
            <div ref={articleContainerRef}>{children}</div>
            <Section>
              <div className="mt-8">
                <QuestionPagination
                  currentHref={pathname ?? ''}
                  items={flatNavigationItems}
                />
              </div>
            </Section>
          </div>
          {tableOfContents && (
            <Section>
              <div
                key={currentItem?.href}
                className="hidden w-56 xl:sticky xl:block xl:flex-none xl:overflow-y-auto xl:overflow-x-hidden xl:py-12 xl:px-6"
                style={{
                  height: FooterlessContainerHeight,
                  top: `var(--navbar-height)`,
                }}>
                <GuidesTableOfContents tableOfContents={tableOfContents} />
              </div>
            </Section>
          )}
        </div>
      </div>
    </GuidesHeadingObserver>
  );
}
