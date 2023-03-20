import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProfileShell from './ProfileShell';

type Props = Readonly<{
  children: ReactNode;
}>;

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/profile',
    title: 'Profile',
  });
}

export default async function ProfileLayout({ children }: Props) {
  const user = await fetchUser();

  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/profile')}`);
  }

  return <ProfileShell user={user}>{children}</ProfileShell>;
}
