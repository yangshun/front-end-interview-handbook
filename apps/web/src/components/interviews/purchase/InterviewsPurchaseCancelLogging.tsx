import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { purchaseCancelLogging } from '~/components/purchase/PurchaseLogging';

import type {
  InterviewsPricingPlanPaymentConfigLocalizedRecord,
  InterviewsPricingPlanType,
} from './InterviewsPricingPlans';

export function useInterviewsPurchaseCancelLogging(
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord,
) {
  const searchParams = useSearchParams();
  const cancelSearchParam = searchParams?.get('checkout_cancel');
  const planSearchParam = searchParams?.get(
    'plan',
  ) as InterviewsPricingPlanType | null;

  useEffect(() => {
    if (cancelSearchParam && planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseCancelLogging({
        plan: planSearchParam,
        product: 'interviews',
        purchasePrice: paymentConfig,
      });
    }
  }, [cancelSearchParam, planSearchParam, plansPaymentConfig]);
}

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function InterviewsPurchaseCancelLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useInterviewsPurchaseCancelLogging(plansPaymentConfig);

  return null;
}

// UseSearchParams should be within a suspense boundary according to
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function InterviewsPurchaseCancelLogging(props: Props) {
  return (
    <Suspense>
      <InterviewsPurchaseCancelLoggingImpl {...props} />
    </Suspense>
  );
}
