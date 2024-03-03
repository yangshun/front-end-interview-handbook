'use client';

import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/payments/pricingConfig';
import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '~/components/projects/purchase/ProjectsPricingPlans';
import ProjectsPricingTable from '~/components/projects/purchase/ProjectsPricingTable';
import useProjectsPricingPlansList from '~/components/projects/purchase/useProjectsPricingPlansList';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';

function PricingTable({
  countryCode,
  plans,
}: Readonly<{
  countryCode: string;
  plans: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>) {
  const planList = useProjectsPricingPlansList(plans);
  const annualPlan = plans.ANNUAL;

  const showPPPMessage =
    annualPlan.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  return (
    <ProjectsPricingTable
      countryCode={countryCode}
      planList={planList}
      showPPPMessage={showPPPMessage}
    />
  );
}

export default function ProjectsSettingsBillingSubscriptionSection() {
  const pricingPlans = trpc.purchases.projectsPlans.useQuery();

  return (
    <Section>
      <div className="flex flex-col gap-6">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Manage your subscription"
            description="Title for manage your subscription section"
            id="PowG3S"
          />
        </Heading>
        {pricingPlans.data == null ? (
          <Spinner display="block" size="lg" />
        ) : (
          <PricingTable
            countryCode={pricingPlans.data.country.code}
            plans={pricingPlans.data.plans}
          />
        )}
      </div>
    </Section>
  );
}
