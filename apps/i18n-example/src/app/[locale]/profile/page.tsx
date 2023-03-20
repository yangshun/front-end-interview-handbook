import type { Metadata } from 'next';
import { i18nMetadata } from 'next-i18nostic';

import { getIntlServerOnly } from '~/intl';

import ProfilePage from './ProfilePage';

export async function generateMetadata({
  params: { locale },
}: Readonly<{ params: { locale: string } }>): Promise<Metadata> {
  const intl = await getIntlServerOnly(locale);

  return i18nMetadata({
    alternates: {
      canonical: '/profile',
    },
    title: intl.formatMessage({
      defaultMessage: 'Profile',
      description: 'Profile page title',
      id: '81i+95',
    }),
  });
}

export default async function Page() {
  return <ProfilePage />;
}
