import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PromotionsPage from './PromotionsPage';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Pricing plans tailored to your needs. Grab our all-access lifetime plans at a 30% discount today!',
      description: 'Description of Pricing page',
      id: 'wmvMT1',
    }),
    locale,
    pathname: '/pricing',
    title: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Title of Pricing page',
      id: 'PeXK7/',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Page() {
  return <PromotionsPage />;
}
