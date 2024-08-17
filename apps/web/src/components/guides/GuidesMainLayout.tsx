'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useToggle } from 'usehooks-ts';

import ArticlePagination from '~/components/common/ArticlePagination';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import GuidesLayoutContent from './GuidesLayoutContent';
import GuidesNavbar from './GuidesNavbar';
import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type { GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';

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
  const [isFocusMode, toggleFocusMode] = useToggle();

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
        <div className="mx-auto flex">
          <div
            className={clsx(
              'hidden lg:contents',
              'sticky top-[var(--global-sticky-height)]',
            )}>
            <GuidesSidebar
              isFocusMode={isFocusMode}
              navigation={navigation}
              sticky={true}
              toggleFocusMode={toggleFocusMode}
            />
          </div>
          <GuidesLayoutContent>
            <div
              className={clsx(
                'flex flex-col gap-6 overflow-auto',
                'w-full max-w-[620px]',
              )}>
              <div className="flex flex-col gap-y-4">
                {navigation.title && (
                  <Text
                    className="block"
                    color="secondary"
                    size="body2"
                    weight="medium">
                    {navigation.title}
                  </Text>
                )}
                <div ref={articleContainerRef}>{children}</div>
              </div>
              <Section>
                <div className="mt-8">
                  <ArticlePagination
                    activeItem={pathname ?? ''}
                    items={flatNavigationItems}
                  />
                </div>
              </Section>
            </div>
            {tableOfContents && (
              <Section>
                <div
                  key={currentItem?.href}
                  className="hidden w-[252px] xl:sticky xl:block xl:flex-none xl:overflow-y-auto xl:overflow-x-hidden"
                  style={{
                    height: 'calc(100vh - 24px - var(--global-sticky-height))',
                    top: 'calc(24px + var(--global-sticky-height))',
                  }}>
                  <GuidesTableOfContents
                    collapsed={isFocusMode}
                    tableOfContents={tableOfContents}
                  />
                </div>
              </Section>
            )}
          </GuidesLayoutContent>
        </div>
      </div>
    </GuidesHeadingObserver>
  );
}
