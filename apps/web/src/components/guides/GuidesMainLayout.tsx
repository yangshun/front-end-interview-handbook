'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useScrollToTop from '~/hooks/useScrollToTop';

import { useIntl } from '~/components/intl';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import { useGuidesContext } from './GuidesLayout';
import GuidesNavbar from './GuidesNavbar';
import { GUIDES_BOTTOM_PAGINATION_HEIGHT } from './GuidesPagination';
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
    studyListKey?: string;
    tableOfContents?: TableOfContents;
  }
>;

export default function GuidesMainLayout({
  bottomNav,
  children,
  navigation,
  guide,
  studyListKey,
  tableOfContents,
  showMarkAsComplete = false,
  metadata,
  ...props
}: Props) {
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const { navigateToSignInUpPage } = useAuthSignInUp();
  const { collapsedToC, setCollapsedToC } = useGuidesContext();
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
            'px-4 pb-20 pt-12 md:px-6 lg:px-8 xl:pl-12 xl:pr-6',
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
          {tableOfContents && (
            <Section>
              <aside
                key={currentItem?.href}
                className={clsx(
                  'hidden overflow-hidden xl:sticky xl:block xl:flex-none xl:overflow-x-hidden',
                  collapsedToC ? 'lg:w-[252px]' : 'w-[252px]',
                )}
                style={{
                  height: `calc(100vh - 48px - var(--global-sticky-height) - ${GUIDES_BOTTOM_PAGINATION_HEIGHT})`,
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
        {bottomNav}
      </div>
    </GuidesHeadingObserver>
  );
}
