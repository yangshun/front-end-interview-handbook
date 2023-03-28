import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PaymentSuccessPage from './PaymentSuccessPage';

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
    pathname: '/payment/success',
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
  const plans = await fetchLocalizedPlanPricing(countryCode);

  return <PaymentSuccessPage plans={plans} />;
}
