import type { Metadata } from 'next/types';

import SponsorsAdvertiseWithUsPage from '~/components/sponsors/advertise-with-us/SponsorsAdvertiseWithUsPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Advertise with us',
    description: 'Title of advertise with us page',
    id: 'KtRb5s',
  });
  const description = intl.formatMessage(
    {
      defaultMessage:
        'Advertise to {engineersCount}+ Front End Engineers with high ROI placements',
      description: 'Title of advertise with us page',
      id: 'FKqEn/',
    },
    {
      engineersCount: '600k',
    },
  );

  return defaultMetadata({
    description,
    locale,
    ogImageTitle: title,
    pathname: '/advertise-with-us',
    title,
  });
}

export default async function Page() {
  return <SponsorsAdvertiseWithUsPage />;
}
