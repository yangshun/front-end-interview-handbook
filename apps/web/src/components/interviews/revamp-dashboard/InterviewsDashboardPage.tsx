'use client';

import clsx from 'clsx';

import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';
import InterviewsDashboardRecommendedPreparationStrategy from './InterviewsDashboardRecommendedPreparationStrategy';

export default function InterviewsDashboardPage() {
  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
      <InterviewsDashboardRecommendedPreparationStrategy />
    </div>
  );
}
