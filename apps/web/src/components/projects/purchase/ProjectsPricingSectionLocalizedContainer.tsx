import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';

import ProjectsPricingSection from './ProjectsPricingSection';

export default function ProjectsPricingSectionLocalizedContainer() {
  const pricingPlans = trpc.purchases.projectsPlans.useQuery();

  const { data } = pricingPlans;

  if (data == null) {
    return null;
  }

  const { country, plans } = data;

  return (
    <ProjectsPricingSection
      countryCode={country.code}
      countryName={country.name}
      description={
        <FormattedMessage
          defaultMessage="We're largely free to use, but Premium gives you access to our best material and efforts."
          description="Description of the pricing section in the Projects marketing page"
          id="KhMTHf"
        />
      }
      heading={
        <FormattedMessage
          defaultMessage="Build better and learn faster with Premium"
          description="Title of Pricing section in Projects marketing page"
          id="2Hvmmw"
        />
      }
      plansPaymentConfig={plans}
      title={
        <FormattedMessage
          defaultMessage="Get premium"
          description="Description of the pricing section in the Projects marketing page"
          id="KsNZvV"
        />
      }
      useCurrentPageAsCancelUrl={false}
    />
  );
}
