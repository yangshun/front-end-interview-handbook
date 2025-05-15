import type { ProjectsSubscriptionPlan } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { purchaseCancelLogging } from '~/components/purchase/PurchaseLogging';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';

export function useProjectsPurchaseCancelLogging(
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const cancelSearchParam = searchParams?.get('checkout_cancel');
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

  useEffect(() => {
    if (cancelSearchParam && planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseCancelLogging({
        plan: planSearchParam,
        product: 'projects',
        purchasePrice: paymentConfig,
      });
    }
  }, [cancelSearchParam, planSearchParam, plansPaymentConfig]);
}

type Props = Readonly<{
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function ProjectsPurchaseCancelLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useProjectsPurchaseCancelLogging(plansPaymentConfig);

  return null;
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function ProjectsPurchaseCancelLogging(props: Props) {
  return (
    <Suspense>
      <ProjectsPurchaseCancelLoggingImpl {...props} />
    </Suspense>
  );
}
