'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import type { ProjectsPricingPlansLocalized } from './ProjectsPricingPlans';
import ProjectsPricingPromotions from './ProjectsPricingPromotions';
import ProjectsPricingSection from './ProjectsPricingSection';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plans: ProjectsPricingPlansLocalized;
}>;

export default function ProjectsPricingPage({
  countryCode,
  countryName,
  plans,
}: Props) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

  const cancelSearchParam = searchParams?.get('cancel');

  useEffect(() => {
    if (cancelSearchParam && planSearchParam != null) {
      gtag.event({
        action: `checkout.cancel`,
        category: 'ecommerce',
        label: `[projects] ${planSearchParam}`,
      });
      gtag.event({
        action: `checkout.cancel.${planSearchParam}`,
        category: 'ecommerce',
        label: `[projects] ${planSearchParam}`,
      });
      logMessage({
        level: 'warning',
        message: `[projects] Cancelled checkout for ${planSearchParam}`,
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
        'pb-12 lg:pt-8',
        'dark:bg-[#070708]',
      )}>
      <div className="flex flex-col">
        <ProjectsPricingSection
          countryCode={countryCode}
          countryName={countryName}
          plans={plans}
        />
        <ProjectsPricingPromotions />
      </div>
      {/* TODO(projects): Add FAQ section: <Section></Section> */}
    </div>
  );
}
