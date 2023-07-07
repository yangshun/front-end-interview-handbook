import { useEffect, useState } from 'react';

import type { PricingPlansLocalized } from '~/data/PricingPlans';

import MarketingPricingSection from './MarketingPricingSection';

export default function MarketingPricingSectionLocalizedContainer() {
  const [country, setCountry] = useState<Readonly<{
    code: string;
    name: string;
  }> | null>();
  const [plans, setPlans] = useState<PricingPlansLocalized | null>(null);

  async function fetchPlans() {
    const response = await fetch('/api/payments/purchase/plans');
    const results = (await response.json()) as Readonly<{
      country: {
        code: string;
        name: string;
      };
      plans: PricingPlansLocalized;
    }>;

    setPlans(results.plans);
    setCountry(results.country);
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  if (plans == null || country == null) {
    return null;
  }

  return (
    <MarketingPricingSection
      countryCode={country.code}
      countryName={country.name}
      plans={plans}
    />
  );
}
