import { cookies } from 'next/headers';
import type { Metadata } from 'next/types';

import { getIntlServerOnly, getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import RootLayout from './RootLayout';

import '~/styles/globals.css';

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

  const countryCode: string = (() => {
    const defaultCountryCode = 'US';

    // TODO: Using cookies() crash statically generated pages during development.
    // Workaround to allow static page to load during development.
    // https://nextjs.org/docs/messages/app-static-to-dynamic-error
    if (process.env.NODE_ENV === 'development') {
      return defaultCountryCode;
    }

    const cookieStore = cookies();

    return cookieStore.get('country')?.value ?? defaultCountryCode;
  })();

  return (
    <RootLayout
      countryCode={countryCode}
      intlMessages={localeMessages}
      locale={locale}>
      {children}
    </RootLayout>
  );
}
