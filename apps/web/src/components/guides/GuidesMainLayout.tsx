'use client';

import type { GuidebookItem, GuideProgress } from '@prisma/client';
import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import type { ForwardedRef, ReactNode } from 'react';
import React, { forwardRef, memo, useRef } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useScrollToTop from '~/hooks/useScrollToTop';

import GuidesPagination from '~/components/guides/GuidesPagination';
import QuestionBookmarkAction from '~/components/interviews/questions/common/QuestionBookmarkAction';
import QuestionProgressAction from '~/components/interviews/questions/common/QuestionProgressAction';
import QuestionReportIssueButton from '~/components/interviews/questions/common/QuestionReportIssueButton';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nPathname } from '~/next-i18nostic/src';

import GuidesHeadingObserver from './GuidesHeadingObserver';
import { useGuidesContext } from './GuidesLayout';
import GuidesNavbar from './GuidesNavbar';
import GuidesProgressAction from './GuidesProgressAction';
import type { TableOfContents } from './GuidesTableOfContents';
import GuidesTableOfContents from './GuidesTableOfContents';
import type {
  BaseGuideNavigationLink,
  GuideMetadata,
  GuideNavigation,
} from './types';
import useFlattenedNavigationItems from './useFlattenedNavigationItems';
import { useGuidesAutoMarkAsComplete } from './useGuidesAutoMarkAsComplete';

type MarkAsCompleteProps = Readonly<
  | {
      guideMetadata: GuideMetadata;
      guideProgress?: GuideProgress | null;
      isGuideProgressLoaded: boolean;
    }
  | {
      guideMetadata?: GuideMetadata;
    }
>;

type Props<GuideSlug extends string> = Readonly<
  MarkAsCompleteProps & {
    bottomNav?: ReactNode;
    children?: React.ReactNode;
    guide: GuidebookItem;
    isAccessibleForFree?: boolean;
    navigation: GuideNavigation<GuideSlug>;
    questionMetadata?: React.ComponentProps<
      typeof GuidesPagination
    >['questionMetadata'];
    studyListKey?: string;
    tableOfContents?: TableOfContents;
  }
>;

export default function GuidesMainLayout<GuideSlug extends string>({
  bottomNav: bottomNavProp,
  children,
  guide,
  guideMetadata,
  navigation,
  questionMetadata,
  studyListKey,
  tableOfContents,
  ...props
}: Props<GuideSlug>) {
  const { pathname } = useI18nPathname();
  const { collapsedToC, focusMode, setCollapsedToC } = useGuidesContext();
  const articleContainerRef = useRef<HTMLDivElement>(null);

  useScrollToTop([pathname]);

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
          <MemoizedGuidesMainContent
            ref={articleContainerRef}
            currentItem={currentItem}
            guideMetadata={guideMetadata}
            questionMetadata={questionMetadata}
            studyListKey={studyListKey}
            {...props}>
            {children}
          </MemoizedGuidesMainContent>
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

type GuidesMainContentProps<GuideSlug extends string> = Readonly<
  MarkAsCompleteProps & {
    children?: React.ReactNode;
    currentItem: BaseGuideNavigationLink<GuideSlug>;
    questionMetadata?: React.ComponentProps<
      typeof GuidesPagination
    >['questionMetadata'];
    studyListKey?: string;
  }
>;

function GuidesMainContent<GuideSlug extends string>(
  {
    children,
    currentItem,
    guideMetadata,
    questionMetadata,
    studyListKey,
    ...props
  }: GuidesMainContentProps<GuideSlug>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      className={clsx('flex flex-col gap-6', 'mx-auto w-full max-w-[620px]')}>
      <div ref={ref}>{children}</div>
      <Section>
        <Divider color="emphasized" />
        <SponsorsAdFormatInContentContainer adPlacement="guide" size="md" />
        <Divider color="emphasized" />
        {questionMetadata && (
          <div className="flex justify-between gap-4">
            <QuestionReportIssueButton
              entity="question"
              format={questionMetadata.format}
              isLabelHidden={false}
              showTooltip={false}
              slug={questionMetadata.slug}
            />
            <div className="flex gap-x-2">
              <QuestionBookmarkAction metadata={questionMetadata} />
              <QuestionProgressAction
                metadata={questionMetadata}
                studyListKey={studyListKey}
              />
            </div>
          </div>
        )}
        {guideMetadata && (
          <div className="flex justify-between gap-4">
            <QuestionReportIssueButton
              book={guideMetadata.book}
              entity="article"
              isLabelHidden={false}
              showTooltip={false}
              slug={guideMetadata.id}
            />
            <div className="flex max-w-64 flex-col items-end gap-2">
              <GuidesProgressAction
                guideName={currentItem.label}
                guideProgress={
                  'guideProgress' in props ? props.guideProgress : null
                }
                metadata={guideMetadata}
                studyListKey={studyListKey}
              />
              <MarkAsCompleteCheckbox />
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

function MarkAsCompleteCheckbox() {
  const intl = useIntl();
  const user = useUser();

  const [autoMarkAsComplete, setAutoMarkAsComplete] =
    useGuidesAutoMarkAsComplete();
  const { navigateToSignInUpPage } = useAuthSignInUp();

  return (
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
  );
}

const MemoizedGuidesMainContent = memo(forwardRef(GuidesMainContent));
