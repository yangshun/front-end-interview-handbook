'use client';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';

import ProjectsSettingsBillingPaymentSection from './components/ProjectsSettingsBillingPaymentSection';
import ProjectsSettingsBillingSubscriptionSection from './components/ProjectsSettingsBillingSubscriptionSection';

export default function ProjectsSettingsBillingPage() {
  const { data: pricingPlans, isLoading } =
    trpc.purchases.projectsPlans.useQuery();

  return (
    <div className="flex flex-col gap-12">
      {isLoading ? (
        <Spinner display="block" size="lg" />
      ) : (
        <>
          <ProjectsSettingsBillingSubscriptionSection
            pricingPlans={pricingPlans!}
          />
          <ProjectsSettingsBillingPaymentSection />
        </>
      )}
    </div>
  );
}
