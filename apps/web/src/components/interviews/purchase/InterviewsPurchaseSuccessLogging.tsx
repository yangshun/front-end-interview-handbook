import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import { purchaseSuccessLogging } from '~/components/purchase/PurchaseLogging';

import { useI18nRouter } from '~/next-i18nostic/src';

import type { InterviewsPricingPlanType } from './InterviewsPricingPlans';

export function useInterviewsPurchaseSuccessLogging() {
  const searchParams = useSearchParams();

  trpc.purchases.lastSuccessfulPaymentThatHasntBeenLogged.useQuery(undefined, {
    onSuccess: (data) => {
      if (data == null) {
        return;
      }

      const planSearchParam = searchParams?.get(
        'plan',
      ) as InterviewsPricingPlanType;

      purchaseSuccessLogging({
        amount: data.amount,
        currency: data.currency,
        plan: planSearchParam,
        product: 'interviews',
      });
    },
  });
}

export function InterviewsPurchaseSuccessLoggingImpl() {
  useInterviewsPurchaseSuccessLogging();

  // Redirect to interviews dashboard after 24 hours,
  // we don't want users to stay on the success page for too long
  const router = useI18nRouter();

  useEffect(() => {
    const timer = setTimeout(
      () => {
        router.push('/interviews/dashboard');
      },
      24 * 3600 * 1000,
    );

    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function InterviewsPurchaseSuccessLogging() {
  return (
    <Suspense>
      <InterviewsPurchaseSuccessLoggingImpl />
    </Suspense>
  );
}
