'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import type {
  InterviewsPricingPlansLocalized,
  InterviewsPricingPlanType,
} from '~/data/interviews/InterviewsPricingPlans';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import ProjectsPricingSection from './ProjectsPricingSection';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: InterviewsPricingPlansLocalized;
}>;

export default function PricingPage({
  countryCode,
  countryName,
  plans,
}: Props) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as InterviewsPricingPlanType | null;

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
      className={clsx(
        'flex flex-col gap-y-16 sm:gap-y-20',
        'lg:pt-8',
        'dark:bg-[#070708]',
      )}>
      <ProjectsPricingSection
        countryCode={countryCode}
        countryName={countryName}
        plans={plans}
      />
      {/* TODO(projects): Add FAQ section: <Section></Section> */}
    </div>
  );
}
