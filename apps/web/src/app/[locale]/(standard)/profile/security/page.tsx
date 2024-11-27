import type { Metadata } from 'next';

import ProfileSecurity from '~/components/profile/ProfileSecurity';

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
  const title = intl.formatMessage({
    defaultMessage: 'Security | Profile',
    description: 'Title of Profile Security page',
    id: 'cB23kJ',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile/security',
    title,
  });
}

export default async function ProfileSecurityPage() {
  return <ProfileSecurity />;
}
