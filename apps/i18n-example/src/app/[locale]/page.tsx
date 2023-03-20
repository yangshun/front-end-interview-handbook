import type { Metadata } from 'next';
import { i18nMetadata } from 'next-i18nostic';

import { getIntlServerOnly } from '~/intl';

import IndexPage from './IndexPage';

export async function generateMetadata({
  params: { locale },
}: Readonly<{ params: { locale: string } }>): Promise<Metadata> {
  const intl = await getIntlServerOnly(locale);

  return i18nMetadata({
    alternates: {
      canonical: '/',
    },
    title: intl.formatMessage({
      defaultMessage: 'Welcome',
      description: 'Welcome message',
      id: 'iyaPkC',
    }),
  });
}

export default function Page() {
  return <IndexPage />;
}
