'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import useScrollToTop from '~/hooks/useScrollToTop';

import { INTERVIEWS_REVAMP_DASHBOARD } from '~/data/FeatureFlags';

import ArticlePagination from '~/components/common/ArticlePagination';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import type { GuideProgress } from '~/db/guides/GuideProgressTypes';
import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import { useGuidesContext } from './GuidesLayout';
import GuidesNavbar from './GuidesNavbar';
import GuidesProgressAction from './GuidesProgressAction';
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
  const { collapsedToC, setCollapsedToC } = useGuidesContext();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  useScrollToTop([pathname]);

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  for (let i = 0; i < flatNavigationItems.length; i++) {
    if (
      flatNavigationItems[i]?.href !== pathname &&
      flatNavigationItems[i].slug !== pathname
    ) {
      continue;
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
        <div
          className={clsx(
            'flex w-full grow gap-12',
            'px-4 pb-20 pt-12 md:px-6 lg:px-8 xl:pl-12 xl:pr-6',
          )}>
          <div
            className={clsx(
              'flex flex-col gap-12',
              'mx-auto w-full max-w-[620px]',
            )}>
            <div ref={articleContainerRef}>{children}</div>
            <Section>
              {showMarkAsComplete &&
                metadata &&
                INTERVIEWS_REVAMP_DASHBOARD && (
                  <>
                    <div
                      className={clsx(
                        'flex justify-end',
                        'transition-colors',
                        'isGuideProgressSuccess' in props &&
                          props.isGuideProgressSuccess
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}>
                      <GuidesProgressAction
                        guideProgress={
                          'guideProgress' in props ? props.guideProgress : null
                        }
                        metadata={metadata}
                      />
                    </div>
                    <Divider />
                  </>
                )}
              <ArticlePagination
                activeItem={pathname ?? ''}
                items={flatNavigationItems}
              />
            </Section>
          </div>
          {tableOfContents && (
            <Section>
              <aside
                key={currentItem?.href}
                className={clsx(
                  'hidden overflow-hidden xl:sticky xl:block xl:flex-none xl:overflow-x-hidden',
                  !collapsedToC && 'w-[252px]',
                )}
                style={{
                  height: 'calc(100vh - 48px - var(--global-sticky-height))',
                  top: 'calc(48px + var(--global-sticky-height))',
                }}>
                <GuidesTableOfContents
                  collapsed={collapsedToC}
                  isCollapsible={true}
                  setCollapsedToC={setCollapsedToC}
                  tableOfContents={tableOfContents}
                />
              </aside>
            </Section>
          )}
        </div>
      </div>
    </GuidesHeadingObserver>
  );
}
