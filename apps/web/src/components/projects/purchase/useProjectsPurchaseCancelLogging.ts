import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import gtag from '~/lib/gtag';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export default function useProjectsPurchaseCancelLogging(
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const cancelSearchParam = searchParams?.get('checkout_cancel');
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

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
}
