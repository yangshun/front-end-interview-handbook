import { useEffect, useState } from 'react';

import type { PricingPlansLocalized } from '~/data/PricingPlans';

import MarketingPricingSection from './MarketingPricingSection';

export default function MarketingPricingSectionLocalizedContainer() {
  const [countryCode, setCountryCode] = useState<string | null>();
  const [plans, setPlans] = useState<PricingPlansLocalized | null>(null);

  async function fetchPlans() {
    const response = await fetch('/api/payments/purchase/plans');
    const results = (await response.json()) as Readonly<{
      countryCode: string;
      plans: PricingPlansLocalized;
    }>;

    setPlans(results.plans);
    setCountryCode(results.countryCode);
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  if (plans == null || countryCode == null) {
    return null;
  }

  return <MarketingPricingSection countryCode={countryCode} plans={plans} />;
}
