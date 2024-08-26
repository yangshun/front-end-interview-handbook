'use client';

import clsx from 'clsx';

import InterviewsDashboardPageHeader from './InterviewsDashboardPageHeader';

export default function InterviewsDashboardPage() {
  return (
    <div className={clsx('flex flex-col gap-12')}>
      <InterviewsDashboardPageHeader />
    </div>
  );
}
