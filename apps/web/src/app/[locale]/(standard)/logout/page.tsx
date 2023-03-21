import type { Metadata } from 'next/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import LogoutPage from './LogoutPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    pathname: '/logout',
    title: intl.formatMessage({
      defaultMessage: 'Signing Out',
      description: 'Title of Logout page',
      id: 'iSFCj/',
    }),
  });
}

export default LogoutPage;
