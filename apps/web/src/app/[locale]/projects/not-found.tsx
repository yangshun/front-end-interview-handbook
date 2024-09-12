import type { Metadata } from 'next/types';
import nextI18nosticConfig from 'next-i18nostic/config';

import ProjectsNotFoundPage from '~/components/projects/common/ProjectsNotFoundPage';

import { getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import RootLayout from '../RootLayout';

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

export default async function ProjectsNotFound({ params }: Props) {
  const locale = params?.locale ?? nextI18nosticConfig.defaultLocale;
  const localeMessages = await getLocaleMessages(locale);

  return (
    <RootLayout intlMessages={localeMessages} locale={locale}>
      <ProjectsNotFoundPage />
    </RootLayout>
  );
}
