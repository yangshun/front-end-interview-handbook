import type { Metadata } from 'next/types';

import SponsorsAdvertiseRequestSuccessPage from '~/components/sponsors/request/SponsorsAdvertiseRequestSuccessPage';

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
      defaultMessage: 'Sponsorship request success page',
      description: 'Title of advertisement request success page',
      id: '7YO/82',
    }),
    pathname: '/advertise-with-us/request/update-success',
    title: intl.formatMessage({
      defaultMessage: 'Request success | Advertise with us',
      description: 'Title of advertise with us page',
      id: 'fig6ds',
    }),
  });
}

export default async function Page() {
  return <SponsorsAdvertiseRequestSuccessPage mode="update" />;
}
