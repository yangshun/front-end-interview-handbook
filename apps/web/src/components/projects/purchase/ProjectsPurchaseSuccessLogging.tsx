import type { ProjectsSubscriptionPlan } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { purchaseSuccessLogging } from '~/components/purchase/PurchaseLogging';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';

export function useProjectsPurchaseSuccessLogging(
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

  useEffect(() => {
    if (planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseSuccessLogging({
        plan: planSearchParam,
        product: 'projects',
        purchasePrice: paymentConfig,
      });
    }
  }, [planSearchParam, plansPaymentConfig]);
}

type Props = Readonly<{
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function ProjectsPurchaseSuccessLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useProjectsPurchaseSuccessLogging(plansPaymentConfig);

  return null;
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function ProjectsPurchaseSuccessLogging(props: Props) {
  return (
    <Suspense>
      <ProjectsPurchaseSuccessLoggingImpl {...props} />
    </Suspense>
  );
}
