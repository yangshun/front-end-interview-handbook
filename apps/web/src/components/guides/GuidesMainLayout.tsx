'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import React, { useRef } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useScrollToTop from '~/hooks/useScrollToTop';

import GuidesPagination from '~/components/guides/GuidesPagination';
import { useIntl } from '~/components/intl';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import { useGuidesContext } from './GuidesLayout';
import GuidesNavbar from './GuidesNavbar';
import GuidesProgressAction from './GuidesProgressAction';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type { GuideMetadata, GuideNavigation } from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useGuidesAutoMarkAsComplete } from './useGuidesAutoMarkAsComplete';

import type { GuidebookItem, GuideProgress } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';

type MarkAsCompleteProps = Readonly<
  | {
      guideProgress?: GuideProgress | null;
      isGuideProgressLoaded: boolean;
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
    bottomNav?: ReactNode;
    children?: React.ReactNode;
    guide: GuidebookItem;
    isAccessibleForFree?: boolean;
    navigation: GuideNavigation;
    questionMetadata?: React.ComponentProps<
      typeof GuidesPagination
    >['questionMetadata'];
    studyListKey?: string;
    tableOfContents?: TableOfContents;
  }
>;

export default function GuidesMainLayout({
  bottomNav: bottomNavProp,
  children,
  navigation,
  guide,
  questionMetadata,
  studyListKey,
  tableOfContents,
  showMarkAsComplete = false,
  metadata,
  ...props
}: Props) {
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const { navigateToSignInUpPage } = useAuthSignInUp();
  const { focusMode, collapsedToC, setCollapsedToC } = useGuidesContext();
  const articleContainerRef = useRef<HTMLDivElement>(null);
  const user = useUser();

  useScrollToTop([pathname]);

  const [autoMarkAsComplete, setAutoMarkAsComplete] =
    useGuidesAutoMarkAsComplete();

  const flatNavigationItems = useFlattenedNavigationItems(navigation);

  const currentItem = flatNavigationItems.find(
    (item) => item.href === pathname,
  )!;

  for (let i = 0; i < flatNavigationItems.length; i++) {
    if (
      flatNavigationItems[i]?.href !== pathname &&
      flatNavigationItems[i].id !== pathname
    ) {
      continue;
    }
    break;
  }

  const bottomNav = bottomNavProp ?? (
    <GuidesPagination
      guide={guide}
      navigation={navigation}
      questionMetadata={questionMetadata}
    />
  );

  return (
    <GuidesHeadingObserver
      articleContainerRef={articleContainerRef}
      headingSelectors={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}>
      <div className="w-full">
        <GuidesNavbar
          guide={guide}
          navigation={navigation}
          showMenu={!studyListKey}
          tableOfContents={tableOfContents}
        />
        <div
          className={clsx(
            'flex w-full grow gap-12',
            'px-4 md:px-6 lg:px-8 xl:pr-6',
            focusMode
              ? 'xl:pl-[calc(var(--guides-sidebar-width)-var(--guides-sidebar-width-collapsed)+48px)]'
              : 'xl:pl-12',
            'pb-20 pt-12',
          )}>
          <div
            className={clsx(
              'flex flex-col gap-12',
              'mx-auto w-full max-w-[620px]',
            )}>
            <div ref={articleContainerRef}>{children}</div>
            <Section>
              {showMarkAsComplete && metadata && (
                <div className={clsx('flex justify-end', 'transition-colors')}>
                  <div className="max-w-64 flex flex-col items-end gap-2">
                    <GuidesProgressAction
                      guideName={currentItem.label}
                      guideProgress={
                        'guideProgress' in props ? props.guideProgress : null
                      }
                      metadata={metadata}
                      studyListKey={studyListKey}
                    />
                    <CheckboxInput
                      label={intl.formatMessage({
                        defaultMessage:
                          'Automatically mark as complete when moving to the next article',
                        description: 'Mark article as complete automatically',
                        id: 'tdR9Fm',
                      })}
                      size="sm"
                      value={user == null ? undefined : autoMarkAsComplete}
                      onChange={(value) => {
                        if (user == null) {
                          navigateToSignInUpPage({
                            query: { source: 'track_progress' },
                          });

                          return;
                        }
                        setAutoMarkAsComplete(value);
                      }}
                    />
                  </div>
                </div>
              )}
            </Section>
          </div>
          <Section>
            <aside
              key={currentItem?.href}
              className={clsx(
                collapsedToC ? 'lg:w-[252px]' : 'w-[252px]',
                'hidden xl:sticky xl:block xl:flex-none',
                'overflow-hidden xl:overflow-x-hidden',
              )}
              style={{
                height: `calc(100vh - 48px - 48px - var(--global-sticky-height))`, // 48px for top padding, 48px for bottom bar
                top: 'calc(48px + var(--global-sticky-height))',
              }}>
              {tableOfContents && (
                <GuidesTableOfContents
                  collapsed={collapsedToC}
                  isCollapsible={true}
                  setCollapsedToC={setCollapsedToC}
                  tableOfContents={tableOfContents}
                />
              )}
            </aside>
          </Section>
        </div>
        {bottomNav}
      </div>
    </GuidesHeadingObserver>
  );
}
