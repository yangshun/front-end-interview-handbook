import type { Metadata } from 'next/types';

import AuthLoginSuccessPage from '~/components/auth/AuthLoginSuccessPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: { next: string | null };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/login-success',
    title: intl.formatMessage({
      defaultMessage: 'Login successful',
      description: 'Title of login successful page',
      id: 'OKKVCO',
    }),
  });
}

export default async function Page({ searchParams }: Props) {
  return <AuthLoginSuccessPage next={searchParams.next} />;
}
