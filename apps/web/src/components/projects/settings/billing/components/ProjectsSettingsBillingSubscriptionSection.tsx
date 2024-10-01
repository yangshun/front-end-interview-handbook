import { FormattedMessage } from '~/components/intl';
import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '~/components/projects/purchase/ProjectsPricingPlans';
import ProjectsPricingTable from '~/components/projects/purchase/ProjectsPricingTable';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/purchase/PurchasePricingConfig';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

function PricingTable({
  countryCode,
  plansPaymentConfig,
}: Readonly<{
  countryCode: string;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>) {
  const annualPlan = plansPaymentConfig.ANNUAL;

  const showPPPMessage =
    annualPlan.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  return (
    <ProjectsPricingTable
      countryCode={countryCode}
      plansPaymentConfig={plansPaymentConfig}
      showPPPMessage={showPPPMessage}
      useCurrentPageAsCancelUrl={true}
    />
  );
}

type Props = Readonly<{
  countryCode: string;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function ProjectsSettingsBillingSubscriptionSection({
  countryCode,
  plansPaymentConfig,
}: Props) {
  return (
    <Section>
      <div className="flex flex-col gap-6">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Manage your subscription"
            description="Title for manage your subscription section"
            id="PowG3S"
          />
        </Heading>
        <PricingTable
          countryCode={countryCode}
          plansPaymentConfig={plansPaymentConfig}
        />
      </div>
    </Section>
  );
}
