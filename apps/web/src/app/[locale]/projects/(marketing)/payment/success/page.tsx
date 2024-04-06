import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

import ProjectsPaymentSuccessPage from './ProjectsPaymentSuccessPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        "Your payment was successful! You're now ready to unlock premium front-end challenges, engage with experts, and accelerate your learning journey.",
      description: 'Description of Payment Success page',
      id: 'MHPRIV',
    }),
    locale,
    pathname: '/projects/payment/success',
    title: intl.formatMessage({
      defaultMessage: 'Payment success',
      description: 'Title of Payment Success page',
      id: '5VyWIQ',
    }),
  });
}

export default async function Page() {
  const cookieStore = cookies();
  const countryCode: string = cookieStore.get('country')?.value ?? 'US';
  const plansPaymentConfig =
    await fetchProjectsPricingPlanPaymentConfigLocalizedRecord(countryCode);

  return <ProjectsPaymentSuccessPage plansPaymentConfig={plansPaymentConfig} />;
}
