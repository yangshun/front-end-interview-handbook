'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import type { PreparationArea } from '~/data/PreparationAreas';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import PreparationOverallCompletionProgress from '~/components/questions/dashboard/PreparationOverallCompletionProgress';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import PreparationStudyPlansCTA from '~/components/questions/dashboard/PreparationStudyPlansCTA';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/QuestionsFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

import QuestionsContinueLearningWithFetching from './QuestionsContinueLearningWithFetching';

type Props = Readonly<{
  area: PreparationArea;
  children: ReactNode;
  guides: ReadonlyArray<{
    description?: string;
    href: string;
    slug: string;
    title: string;
  }>;
  guidesHref: string;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  title: string;
}>;

export default function PreparePageLayout({
  area,
  children,
  guides,
  guidesHref,
  title,
  questionTotalAvailableCount,
}: Props) {
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
      <Heading className="sr-only" level="custom">
        {title}
      </Heading>
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
          <QuestionsFocusAreas limit={showContinueLearning != null ? 4 : 8} />
        </div>
        <QuestionsPreparationTabs area={area} />
        <div className="xl:grid xl:grid-cols-12 xl:gap-x-6">
          <div className="xl:col-span-9">{children}</div>
          <aside
            className={clsx(
              'hidden h-full flex-col gap-y-12 xl:col-span-3 xl:flex',
            )}>
            <PreparationStudyPlansCTA />
            <PreparationStudyGuideList href={guidesHref} items={guides} />
          </aside>
        </div>
      </Section>
    </Container>
  );
}
