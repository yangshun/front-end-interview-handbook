import type { Metadata } from 'next';
import { i18nMetadata } from 'next-i18nostic';
import nextI18nosticConfig from 'next-i18nostic/config';

import { getIntlServerOnly, getLocaleMessages } from '~/intl';

import LocaleSwitcher from './components/LocaleSwitcher';
import Navbar from './components/Navbar';
import { Providers } from '../Providers';

import '~/styles/globals.css';

export async function generateStaticParams() {
  return nextI18nosticConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const intl = await getIntlServerOnly(locale);

  return i18nMetadata({
    alternates: {
      canonical: '/',
    },
    title: intl.formatMessage({
      defaultMessage: 'Home',
      description: 'Link to home page',
      id: 'OmkkJd',
    }),
  });
}

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const localeMessages = await getLocaleMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers intlMessages={localeMessages} locale={locale}>
          <div style={{ margin: '0 auto', maxWidth: 600 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Navbar />
              <LocaleSwitcher />
            </div>
            <p>Current locale: {locale}</p>
            <hr />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
