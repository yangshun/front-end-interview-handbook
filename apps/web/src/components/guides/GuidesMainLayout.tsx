'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useToggle } from 'usehooks-ts';

import { INTERVIEWS_REVAMP_DASHBOARD } from '~/data/FeatureFlags';

import ArticlePagination from '~/components/common/ArticlePagination';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { GuideProgress } from '~/db/guides/GuideProgressTypes';
import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import GuidesLayoutContent from './GuidesLayoutContent';
import GuidesNavbar from './GuidesNavbar';
import GuidesProgressAction from './GuidesProgressAction';
import { GuidesSidebar } from './GuidesSidebar';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type { GuideMetadata, GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';

type MarkAsCompleteProps = Readonly<
  | {
      guideProgress?: GuideProgress | null;
      isGuideProgressSuccess: boolean;
      metadata: GuideMetadata;
      showMarkAsComplete?: true;
    }
  | {
      metadata?: GuideMetadata;
      showMarkAsComplete?: false;
    }
>;

type Props = Readonly<
  MarkAsCompleteProps & {
    children?: React.ReactNode;
    isAccessibleForFree?: boolean;
    navigation: GuideNavigation;
    tableOfContents?: TableOfContents;
  }
>;

export default function GuidesMainLayout({
  children,
  navigation,
  tableOfContents,
  showMarkAsComplete = false,
  metadata,
  ...props
}: Props) {
  const { pathname } = useI18nPathname();
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const [isFocusMode, toggleFocusMode] = useToggle();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  let nextArticle: Readonly<{
    href?: string;
    title: string;
  }> | null = null;

  for (let i = 0; i < flatNavigationItems.length; i++) {
    if (
      flatNavigationItems[i]?.href !== pathname &&
      flatNavigationItems[i].slug !== pathname
    ) {
      continue;
    }
    if (i + 1 < flatNavigationItems.length) {
      nextArticle = flatNavigationItems[i + 1];
    }
    break;
  }

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
                'flex flex-col gap-12 overflow-auto',
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
                <div className="flex flex-col gap-12">
                  {showMarkAsComplete &&
                    metadata &&
                    INTERVIEWS_REVAMP_DASHBOARD && (
                      <>
                        <div
                          className={clsx(
                            'transition-colors',
                            'isGuideProgressSuccess' in props &&
                              props.isGuideProgressSuccess
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}>
                          <GuidesProgressAction
                            guideProgress={
                              'guideProgress' in props
                                ? props.guideProgress
                                : null
                            }
                            metadata={metadata}
                            nextArticle={nextArticle}
                          />
                        </div>
                        <Divider />
                      </>
                    )}
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
                  className="hidden w-[252px] overflow-hidden xl:sticky xl:block xl:flex-none xl:overflow-x-hidden"
                  style={{
                    height: 'calc(100vh - 48px - var(--global-sticky-height))',
                    top: 'calc(48px + var(--global-sticky-height))',
                  }}>
                  <GuidesTableOfContents
                    collapsed={isFocusMode}
                    isCollapsible={true}
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
