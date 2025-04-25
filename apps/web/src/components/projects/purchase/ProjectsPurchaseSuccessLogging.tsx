import type { ProjectsSubscriptionPlan } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import {
  purchaseSuccessLogging,
  purchaseSuccessLoggingGA,
} from '~/components/purchase/PurchaseLogging';

import { useI18nRouter } from '~/next-i18nostic/src';

import type { ProjectsPricingPlanPaymentConfigLocalizedRecord } from './ProjectsPricingPlans';

export function useProjectsPurchaseSuccessLogging(
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as ProjectsSubscriptionPlan | null;

  useEffect(() => {
    // Intentionally keep the inaccurate logging for GA
    // as GA might rely on this for performance :/
    if (planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseSuccessLoggingGA({
        amount: paymentConfig.unitCostCurrency.withPPP.after,
        currency: paymentConfig.currency.toLocaleLowerCase(),
        plan: planSearchParam,
        product: 'projects',
      });
    }
  }, [planSearchParam, plansPaymentConfig]);

  trpc.purchases.lastSuccessfulPaymentThatHasntBeenLogged.useQuery(undefined, {
    onSuccess: (data) => {
      if (data == null) {
        return;
      }

      purchaseSuccessLogging({
        amount: data.amount,
        currency: data.currency,
        plan: planSearchParam!,
        product: 'projects',
      });
    },
  });
}

type Props = Readonly<{
  plansPaymentConfig: ProjectsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function ProjectsPurchaseSuccessLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useProjectsPurchaseSuccessLogging(plansPaymentConfig);

  const router = useI18nRouter();

  useEffect(() => {
    // Redirect to projects dashboard after a while,
    // we don't want users to stay on the success page for too long
    const timer = setTimeout(() => {
      router.push('/projects/challenges');
    }, 3600 * 1000);

    return () => clearTimeout(timer);
  }, [router]);

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
