import type { Metadata } from 'next';

import ProfileBilling from '~/components/profile/ProfileBilling';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
    pathname: '/profile/billing',
    title: intl.formatMessage({
      defaultMessage: 'Billing | Profile',
      description: 'Title of Profile Billing page',
      id: '+OVTKu',
    }),
  });
}

export default async function ProfileBillingPage() {
  return <ProfileBilling />;
}
