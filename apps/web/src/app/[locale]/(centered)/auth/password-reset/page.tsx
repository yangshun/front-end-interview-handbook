import type { Metadata } from 'next/types';

import AuthPasswordResetPage from '~/components/auth/AuthPasswordResetPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/password-reset',
    title: intl.formatMessage({
      defaultMessage: 'Reset Password',
      description: 'Title of Password Reset page',
      id: 'yeGTq1',
    }),
  });
}

export default AuthPasswordResetPage;
