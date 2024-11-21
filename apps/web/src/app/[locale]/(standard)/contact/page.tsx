import type { Metadata } from 'next/types';

import MarketingContactPage from '~/components/marketing/contact/MarketingContactPage';

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

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        "Have questions or feedback? Contact GreatFrontEnd for support, inquiries, or partnership opportunities. We're here to help front end engineers succeed.",
      description: 'Description of Contact Us page',
      id: 'c9Stvc',
    }),
    locale,
    pathname: '/contact',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Contact Us | GreatFrontEnd',
      description: 'Social title of Contact Us page',
      id: 'ncfJNb',
    }),
    title: intl.formatMessage({
      defaultMessage: 'Contact Us',
      description: 'Title of Contact Us page',
      id: 'R5FPug',
    }),
  });
}

export default function Page() {
  return <MarketingContactPage />;
}
