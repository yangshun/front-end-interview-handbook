import { allInterviewsCompanyGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';

import { INTERVIEWS_REVAMP_DASHBOARD } from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

export default function Page() {
  if (!INTERVIEWS_REVAMP_DASHBOARD) {
    return notFound();
  }

  const sortedGuides = allInterviewsCompanyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  return <InterviewsDashboardPage companyGuides={sortedGuides} />;
}
