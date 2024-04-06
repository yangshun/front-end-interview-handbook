'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import MarketingFeatures from '~/components/interviews/marketing/MarketingFeatures';
import MarketingTestimonialsSection from '~/components/interviews/marketing/testimonials/MarketingTestimonialsSection';
import InterviewsPricingFAQSection from '~/components/interviews/purchase/InterviewsPricingFAQSection';
import type {
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from '~/components/interviews/purchase/InterviewsPricingPlans';
import InterviewsPricingSection from '~/components/interviews/purchase/InterviewsPricingSection';
import Section from '~/components/ui/Heading/HeadingContext';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function InterviewsPricingPage({
  countryCode,
  countryName,
  plans,
}: Props) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as InterviewsPricingPlanType | null;

  const cancelSearchParam = searchParams?.get('checkout_cancel');

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
      className={clsx(
        'flex flex-col gap-y-16 sm:gap-y-20',
        'lg:pt-8',
        'bg-[#070708]',
      )}
      data-color-scheme="dark">
      <InterviewsPricingSection
        countryCode={countryCode}
        countryName={countryName}
        plans={plans}
      />
      <Section>
        <MarketingFeatures />
        <div>
          <InterviewsPricingFAQSection />
          <MarketingTestimonialsSection />
        </div>
      </Section>
    </div>
  );
}
