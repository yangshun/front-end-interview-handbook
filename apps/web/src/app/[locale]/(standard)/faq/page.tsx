import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import FAQPage from './FAQPage';

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
    pathname: '/faq',
    title: intl.formatMessage({
      defaultMessage: 'Frequently asked questions',
      description: 'Title of frequently asked questions page',
      id: 'bBbCZY',
    }),
  });
}

export default function Page() {
  return <FAQPage />;
}
