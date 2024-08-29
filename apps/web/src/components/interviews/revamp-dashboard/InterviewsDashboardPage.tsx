'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';

import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';

import InterviewsDashboardMoreLearningSection from './InterviewsDashboardMoreLearningSection';
import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  preparationPlans: PreparationPlans;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
}>;

export default function InterviewsDashboardPage({
  companyGuides,
  preparationPlans,
  questions,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
      <InterviewsDashboardRecommendedPreparationStrategy />
      <InterviewsDashboardMoreLearningSection
        companyGuides={companyGuides}
        preparationPlans={preparationPlans}
        questions={questions}
      />
    </div>
  );
}
