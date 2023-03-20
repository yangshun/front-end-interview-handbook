import type { Metadata } from 'next/types';

import { getLocaleMessages } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import RootLayout from './RootLayout';

import '~/styles/globals.css';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: 'The ultimate Front End Interview preparation platform.',
    pathname: '/',
    title: 'GreatFrontEnd',
  });
}

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
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
