import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import PaymentSuccessPage from './PaymentSuccessPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/payment/success',
    title: 'Payment Success',
  });
}

export default function Page() {
  return <PaymentSuccessPage />;
}
