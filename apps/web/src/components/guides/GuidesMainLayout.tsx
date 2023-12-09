'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import type { GuideNavigation } from './GuidesLayoutSidebar';
import GuidesNavbar from './GuidesNavbar';
import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import QuestionPagination from '../interviews/questions/content/QuestionPagination';

type Props = Readonly<{
  children?: React.ReactNode;
  isAccessibleForFree?: boolean;
  navigation: GuideNavigation;
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
        <div
          className={clsx(
            'flex grow justify-center gap-x-12',
            'px-4 pb-16 pt-6 md:px-6 lg:px-8',
          )}>
          <div
            className="sticky hidden lg:contents"
            style={{ top: 'var(--nav-top-offset)' }}>
            <GuidesSidebar navigation={navigation} sticky={true} />
          </div>
          <div
            className={clsx(
              'flex flex-col gap-6 overflow-auto',
              'w-full max-w-2xl',
            )}>
            <div className="flex flex-col gap-y-4">
              {navigation.title && (
                <Text
                  color="secondary"
                  display="block"
                  size="body2"
                  weight="medium">
                  {navigation.title}
                </Text>
              )}
              <div ref={articleContainerRef}>{children}</div>
            </div>
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
                className="hidden w-56 xl:sticky xl:block xl:flex-none xl:overflow-y-auto xl:overflow-x-hidden"
                style={{
                  height: 'calc(100vh - 24px - var(--nav-top-offset))',
                  top: 'calc(24px + var(--nav-top-offset))',
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
