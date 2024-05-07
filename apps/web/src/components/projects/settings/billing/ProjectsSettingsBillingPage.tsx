'use client';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';

import ProjectsSettingsBillingPaymentSection from './components/ProjectsSettingsBillingPaymentSection';
import ProjectsSettingsBillingSubscriptionSection from './components/ProjectsSettingsBillingSubscriptionSection';

export default function ProjectsSettingsBillingPage() {
  const { data, isLoading } = trpc.purchases.projectsPlans.useQuery();

  if (isLoading || data == null) {
    return (
      <div className="py-20">
        <Spinner display="block" />
      </div>
    );
  }

  const { country, plans } = data;

  return (
    <div className="flex flex-col gap-12">
      <ProjectsSettingsBillingSubscriptionSection
        countryCode={country.code}
        plansPaymentConfig={plans}
      />
      <ProjectsSettingsBillingPaymentSection />
    </div>
  );
}
