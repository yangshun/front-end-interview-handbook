import { trpc } from '~/hooks/trpc';

import MarketingPricingSection from './MarketingPricingSection';

export default function MarketingPricingSectionLocalizedContainer() {
  const pricingPlans = trpc.purchases.interviewsPlans.useQuery();

  const { data } = pricingPlans;

  if (data == null) {
    return null;
  }

  const { country, plans } = data;

  return (
    <MarketingPricingSection
      countryCode={country.code}
      countryName={country.name}
      plans={plans}
    />
  );
}
