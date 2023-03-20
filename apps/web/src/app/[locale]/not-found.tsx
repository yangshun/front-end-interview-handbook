import type { Metadata } from 'next/types';
import nextI18nosticConfig from 'next-i18nostic/config';

import { getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import StandardLayout from './(standard)/layout';
import NotFoundPage from './NotFoundPage';
import RootLayout from './RootLayout';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: 'The page you requested could not be found.',
    pathname: '/',
    title: 'Not Found',
  });
}

type Props = Readonly<{
  params: { locale: string };
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
