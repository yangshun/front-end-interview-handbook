'use client';

import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { trpc } from '~/hooks/trpc';

import type { PreparationArea } from '~/data/PreparationAreas';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import InterviewsDashboardFeaturedFocusAreas from '~/components/interviews/dashboard/InterviewsDashboardFeaturedFocusAreas';
import InterviewsDashboardOnboarding from '~/components/interviews/dashboard/InterviewsDashboardOnboarding';
import DashboardOverallCompletionProgress from '~/components/interviews/dashboard/InterviewsDashboardOverallCompletionProgress';
import InterviewsDashboardPageHeader from '~/components/interviews/dashboard/InterviewsDashboardPageHeader';
import QuestionsPreparationTabs from '~/components/interviews/questions/listings/filters/QuestionsPreparationTabs';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';
import { useI18nPathname } from '~/next-i18nostic/src';

import DashboardContinueLearningWithFetching from './InterviewsDashboardContinueLearningWithFetching';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  children: ReactNode;
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  studyPlans: ReadonlyArray<InterviewsStudyList>;
}>;

export default function InterviewsDashboardLayout({
  children,
  questionTotalAvailableCount,
  focusAreas,
  studyPlans,
}: Props) {
  const { pathname } = useI18nPathname();
  const tabsRef = useRef<HTMLDivElement>(null);
  const routeSegment = useSelectedLayoutSegment();
  const resultSegment = routeSegment ?? 'coding';
  const { userProfile } = useUserProfile();
  const user = useUser();

  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  useEffect(() => {
    if (routeSegment == null || pathname === '/prepare') {
      return;
    }

    if (
      tabsRef?.current?.offsetTop &&
      // Only scroll if tab contents are not clearly in view.
      Math.abs(window.scrollY - tabsRef?.current?.offsetTop) < 100
    ) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: tabsRef?.current?.offsetTop,
      });
    }, 300);
  }, [pathname, routeSegment]);

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
      )}>
      <Section>
        <div className="flex flex-col gap-y-6">
          <InterviewsDashboardPageHeader />
          {userProfile ? (
            <DashboardOverallCompletionProgress
              questionTotalAvailableCount={questionTotalAvailableCount}
            />
          ) : (
            <InterviewsDashboardOnboarding />
          )}
        </div>
        <div
          className={clsx(
            'hidden gap-6 md:grid',
            showContinueLearning && 'lg:grid-cols-2',
          )}>
          {showContinueLearning && questionListSessions != null && (
            <DashboardContinueLearningWithFetching
              focusAreas={focusAreas}
              items={questionListSessions.map((session) => ({
                completedCount: session._count.progress,
                listKey: session.key,
              }))}
              studyPlans={studyPlans}
            />
          )}
          <InterviewsDashboardFeaturedFocusAreas
            focusAreas={focusAreas}
            limit={showContinueLearning ? 4 : 8}
          />
        </div>
        <div ref={tabsRef}>
          <QuestionsPreparationTabs area={resultSegment as PreparationArea} />
        </div>
        {children}
      </Section>
    </Container>
  );
}
