import type { Metadata } from 'next/types';

import InterviewsPaymentSuccessPage from '~/components/interviews/purchase/InterviewsPaymentSuccessPage';

import emailsClearCheckoutRedis from '~/emails/items/checkout/EmailsCheckoutUtils';
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
  const viewer = await readViewerFromToken();

  if (viewer) {
    // Clear checkout email redis data on payment success
    await emailsClearCheckoutRedis({ userId: viewer.id });
  }

  return <InterviewsPaymentSuccessPage />;
}
