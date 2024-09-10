import type { Metadata } from 'next/types';
import nextI18nosticConfig from 'next-i18nostic/config';

import NotFoundPage from '~/components/global/error/NotFoundPage';

import { getIntlServerOnly, getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import StandardLayout from './(standard)/layout';
import RootLayout from './RootLayout';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage: 'The page you requested could not be found',
      description: 'Description of 404 page',
      id: 'zUR/Om',
    }),
    locale,
    pathname: '/',
    title: intl.formatMessage({
      defaultMessage: 'Not Found',
      description: 'Title of 404 page',
      id: '4/GKns',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  // TODO: i18n. For some reason params is empty during second render.
  // There's no need for the default locale here otherwise.
  const locale = params?.locale ?? nextI18nosticConfig.defaultLocale;
  const localeMessages = await getLocaleMessages(locale);

  return (
    <RootLayout intlMessages={localeMessages} locale={locale}>
      <StandardLayout>
        <NotFoundPage />
      </StandardLayout>
    </RootLayout>
  );
}
