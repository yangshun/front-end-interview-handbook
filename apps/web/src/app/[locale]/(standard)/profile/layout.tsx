import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

import ProfileShell from '~/components/profile/ProfileShell';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUserDoNotUseIfOnlyUserIdOrEmailNeeded } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/profile',
    title: intl.formatMessage({
      defaultMessage: 'Profile',
      description: 'Title of Profile page',
      id: '5hTR16',
    }),
  });
}

export default async function ProfileLayout({ children }: Props) {
  const user = await fetchUserDoNotUseIfOnlyUserIdOrEmailNeeded();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/profile')}`);
  }

  return <ProfileShell user={user}>{children}</ProfileShell>;
}
