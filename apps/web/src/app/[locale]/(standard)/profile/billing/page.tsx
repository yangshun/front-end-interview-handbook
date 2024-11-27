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
  const title = intl.formatMessage({
    defaultMessage: 'Billing | Profile',
    description: 'Title of Profile Billing page',
    id: '+OVTKu',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile/billing',
    title,
  });
}

export default async function ProfileBillingPage() {
  return <ProfileBilling />;
}
