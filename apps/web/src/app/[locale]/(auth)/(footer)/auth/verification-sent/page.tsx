import type { Metadata } from 'next/types';

import AuthVerificationSentPage from '~/components/auth/AuthVerificationSentPage';

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
    pathname: '/auth/verification-sent',
    title: intl.formatMessage({
      defaultMessage: 'Verification email sent',
      description: 'Title of verify email page',
      id: 'pdqnN/',
    }),
  });
}

export default function Page({ searchParams }: Props) {
  return (
    <AuthVerificationSentPage
      email={searchParams.email}
      redirectTo={searchParams.redirect_to}
    />
  );
}
