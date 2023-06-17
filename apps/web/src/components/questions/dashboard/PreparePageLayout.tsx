'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import type { PreparationArea } from '~/data/PreparationAreas';

import { useUserProfile } from '~/components/global/UserProfileProvider';
import { useCodingQuestionListGuideItems } from '~/components/guides/useFrontEndInterviewGuidebookNavigation';
import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import PreparationOverallCompletionProgress from '~/components/questions/dashboard/PreparationOverallCompletionProgress';
import PreparationStudyGuideList from '~/components/questions/dashboard/PreparationStudyGuideList';
import PreparationStudyPlansCTA from '~/components/questions/dashboard/PreparationStudyPlansCTA';
import QuestionsFocusAreas from '~/components/questions/listings/auxilliary/QuestionsFocusAreas';
import QuestionsPreparationOnboarding from '~/components/questions/listings/auxilliary/QuestionsPreparationOnboarding';
import QuestionsPreparationTabs from '~/components/questions/listings/filters/QuestionsPreparationTabs';
import QuestionPreparationPageHeader from '~/components/questions/listings/headers/QuestionPreparationPageHeader';
import QuestionsCodingListWithFilters from '~/components/questions/listings/items/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

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
  title: string;
}>;

export default function PreparePageLayout({
  area,
  children,
  guides,
  guidesHref,
  title,
  questionCompletionCount,
}: Props) {
  const { userProfile } = useUserProfile();

  return (
    <Container className="grid gap-y-12 py-8" variant="normal">
      <Heading className="sr-only" level="custom">
        {title}
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <QuestionPreparationPageHeader />
          {userProfile ? (
            <PreparationOverallCompletionProgress
              questionCompletionCount={questionCompletionCount}
            />
          ) : (
            <QuestionsPreparationOnboarding />
          )}
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-6">
          <div>Hello world</div>
          <QuestionsFocusAreas />
        </div>
        <QuestionsPreparationTabs area={area} />
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="lg:col-span-9">{children}</div>
          <aside
            className={clsx(
              'hidden h-full flex-col gap-y-12 lg:col-span-3 lg:flex',
            )}>
            <PreparationStudyPlansCTA />
            <PreparationStudyGuideList href={guidesHref} items={guides} />
          </aside>
        </div>
      </Section>
    </Container>
  );
}
