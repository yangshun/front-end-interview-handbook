import type { Metadata } from 'next/types';

import SponsorsAdvertiseRequestPage from '~/components/sponsors/request/SponsorsAdvertiseRequestPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    ogImageTitle: intl.formatMessage({
      defaultMessage: 'Sponsorship request',
      description: 'Title of advertisement request page',
      id: '0JpG1r',
    }),
    pathname: '/advertise-with-us/request',
    title: intl.formatMessage({
      defaultMessage: 'Request form | Advertise with us',
      description: 'Title of advertise with us page',
      id: '3W2LB+',
    }),
  });
}

export default async function Page() {
  return <SponsorsAdvertiseRequestPage />;
}
