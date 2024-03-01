import { useEffect, useState } from 'react';

import type { InterviewsPricingPlansLocalized } from '~/data/interviews/InterviewsPricingPlans';

import MarketingPricingSection from './MarketingPricingSection';

export default function MarketingPricingSectionLocalizedContainer() {
  const [country, setCountry] = useState<Readonly<{
    code: string;
    name: string;
  }> | null>();
  const [plans, setPlans] = useState<InterviewsPricingPlansLocalized | null>(
    null,
  );

  async function fetchPlans() {
    const response = await fetch('/api/payments/purchase/plans');
    const results = (await response.json()) as Readonly<{
      country: {
        code: string;
        name: string;
      };
      plans: InterviewsPricingPlansLocalized;
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
