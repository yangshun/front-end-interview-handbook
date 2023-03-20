'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import * as gtag from '~/lib/gtag';

import type { PricingPlansLocalized } from '~/data/PricingPlans';

import PromoBanner from '~/components/global/PromoBanner';
import MarketingFeatures from '~/components/marketing/MarketingFeatures';
import MarketingPricingSection from '~/components/marketing/MarketingPricingSection';
import MarketingTestimonial from '~/components/marketing/MarketingTestimonial';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  countryCode: string;
  plans: PricingPlansLocalized;
}>;

export default function PricingPage({ countryCode, plans }: Props) {
  const searchParams = useSearchParams();
  const planSearchParams = searchParams?.get('plan');
  const cancelSearchParams = searchParams?.get('cancel');

  useEffect(() => {
    if (cancelSearchParams) {
      gtag.event({
        action: `checkout.cancel`,
        category: 'ecommerce',
        label: String(planSearchParams),
      });
      gtag.event({
        action: `checkout.cancel.${planSearchParams}`,
        category: 'ecommerce',
        label: String(planSearchParams),
      });
    }
  }, [cancelSearchParams, planSearchParams]);

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
