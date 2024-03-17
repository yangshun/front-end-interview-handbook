import { FormattedMessage } from 'react-intl';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '~/components/projects/purchase/ProjectsPricingPlans';
import ProjectsPricingTable from '~/components/projects/purchase/ProjectsPricingTable';
import useProjectsPricingPlansList from '~/components/projects/purchase/useProjectsPricingPlansList';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/purchase/PurchasePricingConfig';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

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

type Props = Readonly<{
  pricingPlans: {
    country: { code: string };
    plans: ProjectsPricingPlanPaymentConfigLocalizedRecord;
  };
}>;

export default function ProjectsSettingsBillingSubscriptionSection({
  pricingPlans,
}: Props) {
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
        <PricingTable
          countryCode={pricingPlans.country.code}
          plans={pricingPlans.plans}
        />
      </div>
    </Section>
  );
}
