import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';

import AdvertiseWithUsPage from '~/components/advertise/AdvertiseWithUsPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  try {
    return defaultMetadata({
      locale,
      ogImageTitle: intl.formatMessage(
        {
          defaultMessage:
            'Reach {engineersCount}+ front end engineers per week for just ~${price} CPM',
          description: 'Title of advertise with us page',
          id: '3Hh9Vd',
        },
        {
          engineersCount: '20,000',
          price: 12,
        },
      ),
      pathname: '/advertise-with-us',
      title: intl.formatMessage({
        defaultMessage: 'Advertise with us',
        description: 'Title of advertise with us page',
        id: 'KtRb5s',
      }),
    });
  } catch {
    notFound();
  }
}

export default async function Page() {
  return <AdvertiseWithUsPage />;
}
