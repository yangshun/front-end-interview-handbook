import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PasswordResetPage from './PasswordResetPage';

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
    pathname: '/password/reset',
    title: intl.formatMessage({
      defaultMessage: 'Reset Password',
      description: 'Title of Password Reset page',
      id: 'yeGTq1',
    }),
  });
}

export default PasswordResetPage;
