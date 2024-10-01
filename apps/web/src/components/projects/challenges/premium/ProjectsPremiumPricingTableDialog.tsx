import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import ProjectsPricingTable from '~/components/projects/purchase/ProjectsPricingTable';
import PurchasePPPDiscountAlert from '~/components/purchase/PurchasePPPDiscountAlert';
import { MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE } from '~/components/purchase/PurchasePricingConfig';
import PurchaseProhibitedCountryAlert from '~/components/purchase/PurchaseProhibitedCountryAlert';
import Dialog from '~/components/ui/Dialog';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from '../../purchase/ProjectsPricingPlans';

function PricingTableSection({
  country,
  plansPaymentConfig,
}: Readonly<{
  country: Readonly<{
    code: string;
    name: string;
  }>;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>) {
  const annualPlan = plansPaymentConfig.ANNUAL;

  const showPPPMessage =
    annualPlan.conversionFactor <
    MAXIMUM_PPP_CONVERSION_FACTOR_TO_DISPLAY_BEFORE_PRICE;

  return (
    <div className="flex flex-col gap-y-5">
      <PurchaseProhibitedCountryAlert countryCode={country.code} />
      {showPPPMessage && (
        <PurchasePPPDiscountAlert
          countryName={country.name}
          discount={Math.ceil(100 - annualPlan.conversionFactor * 100)}
        />
      )}
      <ProjectsPricingTable
        background={true}
        countryCode={country.code}
        plansPaymentConfig={plansPaymentConfig}
        showPPPMessage={showPPPMessage}
        useCurrentPageAsCancelUrl={true}
      />
    </div>
  );
}

function ProjectsPremiumPricingTableDialogTableSectionContainer() {
  const { data, isLoading } = trpc.purchases.projectsPlans.useQuery();

  if (isLoading || data == null) {
    return (
      <div className="py-20">
        <Spinner display="block" />
      </div>
    );
  }

  const { country, plans } = data;

  return <PricingTableSection country={country} plansPaymentConfig={plans} />;
}

type Props = Readonly<{
  subtitle?: React.ReactNode;
  title?: string;
  trigger: React.ReactNode;
}>;

export default function ProjectsPremiumPricingTableDialog({
  subtitle: subtitleParam,
  title: titleParam,
  trigger,
}: Props) {
  const intl = useIntl();

  const title =
    titleParam ??
    intl.formatMessage({
      defaultMessage: 'Pricing plans',
      description: 'Title for projects pricing plans',
      id: 'YIry1B',
    });

  const subtitle =
    subtitleParam ??
    intl.formatMessage({
      defaultMessage:
        'Purchase premium to get access to premium challenges, production-ready Figma design files, official guides, solutions, and exclusive component tracks and skill plans.',
      description: 'Subtitle for a premium project paywall',
      id: 'f5Z9tM',
    });

  return (
    <Dialog title={title} trigger={trigger} width="screen-xl">
      <div className="flex w-full flex-col gap-8">
        <Text className="block" color="secondary">
          {subtitle}
        </Text>
        <ProjectsPremiumPricingTableDialogTableSectionContainer />
      </div>
    </Dialog>
  );
}
