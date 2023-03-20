import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ProfileAccount from '~/components/profile/ProfileAccount';

import defaultMetadata from '~/seo/defaultMetadata';
import { fetchUser } from '~/supabase/SupabaseServerGFE';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/profile/account',
    title: 'Account | Profile',
  });
}

export default async function ProfileAccountPage() {
  const user = await fetchUser();

  // Strictly speaking not needed because the profile layout
  // should also blocked access to the page.
  if (user == null) {
    return redirect(`/login?next=${encodeURIComponent('/profile')}`);
  }

  return <ProfileAccount user={user} />;
}
