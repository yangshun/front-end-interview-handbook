import type { Metadata } from 'next/types';

import AuthVerifyEmailPage from '~/components/auth/AuthVerifyEmailPage';

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
    pathname: '/sign-up/verify',
    title: intl.formatMessage({
      defaultMessage: 'Verify email',
      description: 'Title of verify email page',
      id: 'kqh3Qg',
    }),
  });
}

export default function VerifyEmailPage({ searchParams }: Props) {
  return (
    <AuthVerifyEmailPage
      email={searchParams.email}
      redirectTo={searchParams.redirect_to}
    />
  );
}
