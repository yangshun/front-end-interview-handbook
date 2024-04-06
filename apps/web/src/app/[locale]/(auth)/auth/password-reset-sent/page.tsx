import type { Metadata } from 'next/types';

import AuthPasswordResetSentPage from '~/components/auth/AuthPasswordResetSentPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: { email: string; next: string };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/password-reset-sent',
    title: intl.formatMessage({
      defaultMessage: 'Reset password',
      description: 'Title of reset password page',
      id: 'LTreFY',
    }),
  });
}

export default function Page({ searchParams }: Props) {
  return <AuthPasswordResetSentPage next={searchParams.next} />;
}
