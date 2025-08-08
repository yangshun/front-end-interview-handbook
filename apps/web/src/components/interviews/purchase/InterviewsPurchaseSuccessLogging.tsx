import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import usePurchaseLastUsedPaymentProvider from '~/components/purchase/providers/usePurchaseLastUsedPaymentProvider';
import {
  purchaseSuccessLogging,
  purchaseSuccessLoggingGA,
} from '~/components/purchase/PurchaseLogging';

import { useI18nRouter } from '~/next-i18nostic/src';

import type {
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from './InterviewsPricingPlans';

export function useInterviewsPurchaseSuccessLogging(
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const planSearchParam = searchParams?.get(
    'plan',
  ) as InterviewsPricingPlanType | null;

  useEffect(() => {
    // Intentionally keep the inaccurate logging for GA
    // as GA might rely on this for performance :/
    if (planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseSuccessLoggingGA({
        amount: paymentConfig.unitCostCurrency.withPPP.after,
        currency: paymentConfig.currency.toLocaleLowerCase(),
        plan: planSearchParam,
        product: 'interviews',
      });
    }
  }, [planSearchParam, plansPaymentConfig]);

  const { lastPaymentProvider } = usePurchaseLastUsedPaymentProvider();

  trpc.purchases.lastSuccessfulPaymentThatHasntBeenLogged.useQuery(
    {
      checkoutId: lastPaymentProvider?.id ?? '',
      paymentProvider: lastPaymentProvider?.provider ?? 'stripe',
    },
    {
      onSuccess: (data) => {
        if (data == null) {
          return;
        }

        purchaseSuccessLogging({
          amount: data.amount,
          currency: data.currency,
          plan: planSearchParam!,
          product: 'interviews',
        });
      },
    },
  );
}

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function InterviewsPurchaseSuccessLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useInterviewsPurchaseSuccessLogging(plansPaymentConfig);

  const router = useI18nRouter();

  useEffect(() => {
    // Redirect to interviews dashboard after a while,
    // we don't want users to stay on the success page for too long
    const timer = setTimeout(() => {
      router.push('/interviews/dashboard');
    }, 3600 * 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function InterviewsPurchaseSuccessLogging(props: Props) {
  return (
    <Suspense>
      <InterviewsPurchaseSuccessLoggingImpl {...props} />
    </Suspense>
  );
}
