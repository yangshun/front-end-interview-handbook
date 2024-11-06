import { trpc } from '~/hooks/trpc';

import InterviewsPricingSection from './InterviewsPricingSection';

export default function InterviewsPricingSectionLocalizedContainer() {
  const pricingPlans = trpc.purchases.interviewsPlans.useQuery();

  const { data } = pricingPlans;

  if (data == null) {
    return null;
  }

  const { country, plans } = data;

  return (
    <div className="py-20">
      <InterviewsPricingSection
        countryCode={country.code}
        countryName={country.name}
        plans={plans}
      />
    </div>
  );
}
