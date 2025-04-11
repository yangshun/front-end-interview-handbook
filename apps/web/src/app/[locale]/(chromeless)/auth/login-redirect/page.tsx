import type { Metadata } from 'next/types';

import AuthLoginRedirectPage from '~/components/auth/AuthLoginRedirectPage';
import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: { error: string | null; next: string | null };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/login-redirect',
    title: intl.formatMessage({
      defaultMessage: 'Login successful',
      description: 'Title of login successful page',
      id: 'OKKVCO',
    }),
  });
}

export default async function Page({ searchParams, params }: Props) {
  const { locale } = params;

  if (searchParams.error) {
    await redirectToLoginPageIfNotLoggedIn(searchParams.next ?? '', locale);
  }

  return <AuthLoginRedirectPage next={searchParams.next} />;
}
