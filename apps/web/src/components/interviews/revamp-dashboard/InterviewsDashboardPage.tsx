'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';

import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import InterviewsDashboardMoreLearningSection from './InterviewsDashboardMoreLearningSection';
import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  preparationPlans: PreparationPlans;
}>;

export default function InterviewsDashboardPage({
  companyGuides,
  preparationPlans,
}: Props) {
  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
      <InterviewsDashboardRecommendedPreparationStrategy />
      <InterviewsDashboardMoreLearningSection
        companyGuides={companyGuides}
        preparationPlans={preparationPlans}
      />
    </div>
  );
}
