import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

import defaultMetadata from '~/seo/defaultMetadata';

import PaymentSuccessPage from './PaymentSuccessPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/payment/success',
    title: 'Payment Success',
  });
}

export default async function Page() {
  const cookieStore = cookies();
  const countryCode: string = cookieStore.get('country')?.value ?? 'US';
  const plans = await fetchLocalizedPlanPricing(countryCode);

  return <PaymentSuccessPage plans={plans} />;
}
