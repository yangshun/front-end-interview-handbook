import { allInterviewsCompanyGuides } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import type { IntlShape } from 'react-intl';

import { INTERVIEWS_REVAMP_DASHBOARD } from '~/data/FeatureFlags';

import InterviewsDashboardPage from '~/components/interviews/revamp-dashboard/InterviewsDashboardPage';

import { fetchPreparationPlans } from '~/db/PreparationPlansReader';
import { getIntlServerOnly } from '~/i18n';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page({ params }: Props) {
  if (!INTERVIEWS_REVAMP_DASHBOARD) {
    return notFound();
  }

  const sortedGuides = allInterviewsCompanyGuides
    .slice()
    .sort((a, b) => a.ranking - b.ranking);

  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const preparationPlans = await fetchPreparationPlans(intl as IntlShape);

  return (
    <InterviewsDashboardPage
      companyGuides={sortedGuides}
      preparationPlans={preparationPlans}
    />
  );
}
