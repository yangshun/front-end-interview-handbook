'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import type {
  PricingPlansLocalized,
  PricingPlanType,
} from '~/data/PricingPlans';

import PromoBanner from '~/components/global/PromoBanner';
import MarketingFeatures from '~/components/marketing/MarketingFeatures';
import MarketingPricingSection from '~/components/marketing/MarketingPricingSection';
import MarketingTestimonial from '~/components/marketing/MarketingTestimonial';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  countryCode: string;
  plans: PricingPlansLocalized;
}>;

export default function PricingPage({ countryCode, plans }: Props) {
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
        value: plan.unitCostLocalizedInCurrency,
      });
    }
  }, [cancelSearchParam, planSearchParam, plans]);

  return (
    <div className="bg-slate-900">
      <PromoBanner variant="primary" />
      <div className="space-y-16 bg-white sm:space-y-20">
        <MarketingPricingSection countryCode={countryCode} plans={plans} />
        <Section>
          <MarketingFeatures />
          <MarketingTestimonial />
        </Section>
      </div>
    </div>
  );
}
