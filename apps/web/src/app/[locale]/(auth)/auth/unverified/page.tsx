import type { Metadata } from 'next/types';

import AuthUnverifiedEmailPage from '~/components/auth/AuthUnverifiedEmailPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: { email: string; redirect_to: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/unverified',
    title: intl.formatMessage({
      defaultMessage: 'Unverified email',
      description: 'Title of verify email page',
      id: 'FXfZQF',
    }),
  });
}

export default function Page({ searchParams }: Props) {
  return (
    <AuthUnverifiedEmailPage
      email={searchParams.email}
      redirectTo={searchParams.redirect_to}
    />
  );
}
