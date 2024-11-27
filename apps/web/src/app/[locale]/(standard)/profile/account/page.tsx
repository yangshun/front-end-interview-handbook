import type { Metadata } from 'next';

import ProfileAccount from '~/components/profile/ProfileAccount';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser_DO_NOT_USE_IF_ONLY_USER_ID_OR_EMAIL_NEEDED } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);
  const title = intl.formatMessage({
    defaultMessage: 'Account | Profile',
    description: 'Title of Profile Account page',
    id: 'fH+NAA',
  });

  return defaultMetadata({
    locale,
    ogImageTitle: title,
    pathname: '/profile/account',
    title,
  });
}

export default async function ProfileAccountPage() {
  const user = await fetchUser_DO_NOT_USE_IF_ONLY_USER_ID_OR_EMAIL_NEEDED();

  return <ProfileAccount user={user!} />;
}
