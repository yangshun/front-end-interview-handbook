'use client';

import clsx from 'clsx';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import type { PreparationArea } from '~/data/PreparationAreas';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import PreparationOverallCompletionProgress from '~/components/questions/dashboard/PreparationOverallCompletionProgress';
import DashboardFeaturedFocusAreas from '~/components/questions/listings/auxilliary/DashboardFeaturedFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

import QuestionsContinueLearningWithFetching from './QuestionsContinueLearningWithFetching';

type Props = Readonly<{
  children: ReactNode;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
}>;

export default function DashboardLayout({
  children,
  questionTotalAvailableCount,
}: Props) {
  const segment = useSelectedLayoutSegment() ?? 'coding';
  const { userProfile } = useUserProfile();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery();

  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
      )}>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          {userProfile ? (
            <PreparationOverallCompletionProgress
              questionTotalAvailableCount={questionTotalAvailableCount}
            />
          ) : (
            <QuestionsPreparationOnboarding />
          )}
        </div>
        <div
          className={clsx(
            'grid gap-6',
            showContinueLearning && 'lg:grid-cols-2',
          )}>
          {showContinueLearning && questionListSessions != null && (
            <QuestionsContinueLearningWithFetching
              items={questionListSessions.map((session) => ({
                completedCount: session._count.progress,
                listKey: session.key,
              }))}
            />
          )}
          <DashboardFeaturedFocusAreas limit={showContinueLearning ? 4 : 8} />
        </div>
        <div>
          <QuestionsPreparationTabs area={segment as PreparationArea} />
        </div>
        {children}
      </Section>
    </Container>
  );
}
