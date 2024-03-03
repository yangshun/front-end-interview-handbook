'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';
import ProjectsPricingPromotions from './ProjectsPricingPromotions';
import ProjectsPricingSection from './ProjectsPricingSection';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

type Props = Readonly<{
  countryCode: string;
  countryName: string;
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export default function ProjectsPricingPage({
  countryCode,
  countryName,
  plansPaymentConfig,
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

      const paymentConfig = plansPaymentConfig[planSearchParam];

      logEvent('checkout.cancel', {
        currency: paymentConfig.currency.toLocaleUpperCase(),
        plan: planSearchParam,
        value: paymentConfig.unitCostCurrency.withPPP.after,
      });
    }
  }, [cancelSearchParam, planSearchParam, plansPaymentConfig]);

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
          plansPaymentConfig={plansPaymentConfig}
        />
        <ProjectsPricingPromotions />
      </div>
      {/* TODO(projects): Add FAQ section: <Section></Section> */}
    </div>
  );
}
