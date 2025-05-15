import type { Metadata } from 'next/types';

import { getIntlServerOnly, getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import '~/styles/globals.css';

import RootLayout from './RootLayout';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage: 'The ultimate Front End Interview preparation platform.',
      description: 'Description of GreatFrontEnd page',
      id: 'xWAt8Q',
    }),
    locale,
    pathname: '/',
    title: intl.formatMessage({
      defaultMessage: 'GreatFrontEnd',
      description: 'Title of GreatFrontEnd page',
      id: '9DlLF1',
    }),
  });
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale } = params;
  const localeMessages = await getLocaleMessages(locale);

  return (
    <RootLayout intlMessages={localeMessages} locale={locale}>
      {children}
    </RootLayout>
  );
}
