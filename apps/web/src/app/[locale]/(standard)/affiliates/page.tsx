import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import AffiliatePage from './AffiliatePage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Refer more users to us and earn 15% commission of the first order',
      description: 'Description of Affiliate Program page',
      id: 'cxU8W8',
    }),
    locale,
    pathname: '/affiliates',
    title: intl.formatMessage({
      defaultMessage: 'Affiliate Program',
      description: 'Title of Affiliate Program page',
      id: 'X/axGA',
    }),
  });
}

export default function Page() {
  return <AffiliatePage />;
}
