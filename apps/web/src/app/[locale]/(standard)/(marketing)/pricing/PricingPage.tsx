'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import MarketingFAQ from '~/components/marketing/MarketingFAQ';
import MarketingFeatures from '~/components/marketing/MarketingFeatures';
import MarketingPricingSection from '~/components/marketing/MarketingPricingSection';
import MarketingTestimonialsSection from '~/components/marketing/testimonials/MarketingTestimonialsSection';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: PricingPlansLocalized;
}>;

export default function PricingPage({
  countryCode,
  countryName,
  plans,
}: Props) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get('plan') as PricingPlanType | null;

  const cancelSearchParam = searchParams?.get('cancel');

  useEffect(() => {
    if (cancelSearchParam && planSearchParam != null) {
      gtag.event({
        action: `checkout.cancel`,
        category: 'ecommerce',
        label: String(planSearchParam),
      });
      gtag.event({
        action: `checkout.cancel.${planSearchParam}`,
        category: 'ecommerce',
        label: String(planSearchParam),
      });
      logMessage({
        level: 'warning',
        message: `Cancelled checkout for ${planSearchParam}`,
        title: 'Checkout cancel',
      });

      const plan = plans[planSearchParam];

      logEvent('checkout.cancel', {
        currency: plan.currency.toLocaleUpperCase(),
        plan: planSearchParam,
        value: plan.unitCostCurrency.withPPP.after,
      });
    }
  }, [cancelSearchParam, planSearchParam, plans]);

  return (
    <div
      className="flex flex-col gap-y-16 bg-[#070708] sm:gap-y-20 md:pt-8"
      data-mode="dark">
      <MarketingPricingSection
        countryCode={countryCode}
        countryName={countryName}
        plans={plans}
      />
      <Section>
        <MarketingFeatures />
        <div>
          <MarketingFAQ />
          <MarketingTestimonialsSection />
        </div>
      </Section>
    </div>
  );
}
