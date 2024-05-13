import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { purchaseSuccessLogging } from '~/components/purchase/PurchaseLogging';

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
    if (planSearchParam != null) {
      const paymentConfig = plansPaymentConfig[planSearchParam];

      purchaseSuccessLogging({
        plan: planSearchParam,
        product: 'interviews',
        purchasePrice: paymentConfig,
      });
    }
  }, [planSearchParam, plansPaymentConfig]);
}

type Props = Readonly<{
  plansPaymentConfig: InterviewsPricingPlanPaymentConfigLocalizedRecord;
}>;

export function InterviewsPurchaseSuccessLoggingImpl({
  plansPaymentConfig,
}: Props) {
  useInterviewsPurchaseSuccessLogging(plansPaymentConfig);

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
