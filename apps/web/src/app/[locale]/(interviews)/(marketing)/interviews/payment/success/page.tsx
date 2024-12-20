import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import fetchInterviewsPricingPlanPaymentConfigLocalizedRecord from '~/components/interviews/purchase/fetchInterviewsPricingPlanPaymentConfigLocalizedRecord';
import InterviewsPaymentSuccessPage from '~/components/interviews/purchase/InterviewsPaymentSuccessPage';

import clearCheckoutEmailData from '~/emails/items/checkout/EmailsCheckoutEmailData';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/interviews/payment/success',
    title: intl.formatMessage({
      defaultMessage: 'Payment Success',
      description: 'Title of Payment Success page',
      id: 'VlLGKt',
    }),
  });
}

export default async function Page() {
  const cookieStore = cookies();
  const countryCode: string = cookieStore.get('country')?.value ?? 'US';
  const [plansPaymentConfig, viewer] = await Promise.all([
    fetchInterviewsPricingPlanPaymentConfigLocalizedRecord(countryCode),
    readViewerFromToken(),
  ]);

  if (viewer) {
    // Clear checkout email redis data on payment success
    clearCheckoutEmailData({ userId: viewer.id });
  }

  return (
    <InterviewsPaymentSuccessPage plansPaymentConfig={plansPaymentConfig} />
  );
}
