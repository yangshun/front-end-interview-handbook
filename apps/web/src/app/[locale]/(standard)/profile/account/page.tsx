import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ProfileAccount from '~/components/profile/ProfileAccount';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUserDoNotUseIfOnlyUserIdOrEmailNeeded } from '~/supabase/SupabaseServerGFE';

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
    pathname: '/profile/account',
    title: intl.formatMessage({
      defaultMessage: 'Account | Profile',
      description: 'Title of Profile Account page',
      id: 'fH+NAA',
    }),
  });
}

export default async function ProfileAccountPage() {
  const user = await fetchUserDoNotUseIfOnlyUserIdOrEmailNeeded();

  // Strictly speaking not needed because the profile layout
  // should also blocked access to the page.
  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/profile')}`);
  }

  return <ProfileAccount user={user} />;
}
