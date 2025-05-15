import nextI18nosticConfig from 'next-i18nostic/config';
import type { Metadata } from 'next/types';

import InterviewsNotFoundPage from '~/components/interviews/common/InterviewsNotFoundPage';

import { getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import StandardLayout from './(standard)/layout';
import RootLayout from './RootLayout';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: 'The page you requested could not be found',
    locale: nextI18nosticConfig.defaultLocale,
    pathname: '/',
    title: 'Not Found',
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page({ params }: Props) {
  const locale = params?.locale ?? nextI18nosticConfig.defaultLocale;
  const localeMessages = await getLocaleMessages(locale);

  return (
    <RootLayout intlMessages={localeMessages} locale={locale}>
      <StandardLayout>
        <InterviewsNotFoundPage />
      </StandardLayout>
    </RootLayout>
  );
}
