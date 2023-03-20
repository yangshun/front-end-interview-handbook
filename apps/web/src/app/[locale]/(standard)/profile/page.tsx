import type { Metadata } from 'next';

import ProfileActivity from '~/components/profile/ProfileActivity';

import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/profile',
    title: 'Activity | Profile',
  });
}

export default async function ProfileSecurityPage() {
  return <ProfileActivity />;
}
