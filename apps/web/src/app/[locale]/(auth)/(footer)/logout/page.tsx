import type { Metadata } from 'next/types';

import AuthLogoutPage from '~/components/auth/AuthLogoutPage';

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
    pathname: '/logout',
    title: intl.formatMessage({
      defaultMessage: 'Signing Out',
      description: 'Title of Logout page',
      id: 'iSFCj/',
    }),
  });
}

export default AuthLogoutPage;
