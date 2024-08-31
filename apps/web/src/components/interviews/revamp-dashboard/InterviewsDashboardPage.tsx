'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import type { FocusAreas } from '~/data/focus-areas/FocusAreas';
import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';

import InterviewsDashboardContinueLearningSection from './InterviewsDashboardContinueLearningSection';
import InterviewsDashboardMoreLearningSection from './InterviewsDashboardMoreLearningSection';
import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  focusAreas: FocusAreas;
  preparationPlans: PreparationPlans;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
}>;

export default function InterviewsDashboardPage({
  companyGuides,
  preparationPlans,
  questions,
  focusAreas,
}: Props) {
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const showContinueLearning =
    questionListSessions != null && questionListSessions.length > 0;

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
      {showContinueLearning && (
        <InterviewsDashboardContinueLearningSection
          questionListSessions={sessions}
        />
      )}
      <InterviewsDashboardRecommendedPreparationStrategy />
      <InterviewsDashboardMoreLearningSection
        companyGuides={companyGuides}
        focusAreas={focusAreas}
        preparationPlans={preparationPlans}
        questionListSessions={sessions}
        questions={questions}
      />
    </div>
  );
}
