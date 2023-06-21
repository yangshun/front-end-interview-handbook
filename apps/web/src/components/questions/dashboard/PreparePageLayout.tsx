'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

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
import {
  themeGradient1,
  themeGradient2,
  themeGradient3,
} from '~/components/ui/theme';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import type { QuestionTotalAvailableCount } from '~/db/QuestionsListReader';

import QuestionsContinueLearning from './QuestionsContinueLearning';

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
  questionCompletionCount?: QuestionCompletionCount;
  questionTotalAvailableCount: QuestionTotalAvailableCount;
  title: string;
}>;

export default function PreparePageLayout({
  area,
  children,
  guides,
  guidesHref,
  title,
  questionCompletionCount,
  questionTotalAvailableCount,
}: Props) {
  const { userProfile } = useUserProfile();
  // TODO(redesign): show continue learning only if user has progressed
  // on some plans or explicitly started.
  const showContinueLearning = userProfile;

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-6 xl:py-8 2xl:py-10',
        'gap-y-6 xl:gap-y-8 2xl:gap-y-10',
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
            'grid gap-x-6 gap-y-12',
            showContinueLearning && 'lg:grid-cols-2',
          )}>
          {showContinueLearning && (
            <QuestionsContinueLearning
              items={[
                {
                  completedCount: 30,
                  durationMins: 92,
                  gradient: themeGradient1,
                  href: '/dev__/scrapbook?plan=algo',
                  questionsCount: 47,
                  reverseGradient: true,
                  title: 'Data structure and algorithms',
                },
                {
                  completedCount: 25,
                  durationMins: 92,
                  gradient: themeGradient2,
                  href: '/dev__/scrapbook?plan=forms',
                  questionsCount: 47,
                  reverseGradient: true,
                  title: 'Forms',
                },
                {
                  completedCount: 15,
                  durationMins: 92,
                  gradient: themeGradient3,
                  href: '/dev__/scrapbook?plan=accessibility',
                  questionsCount: 47,
                  title: 'Accessibility',
                },
              ]}
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
