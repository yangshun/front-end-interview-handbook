import type { Metadata } from 'next';

import ProfileSecurity from '~/components/profile/ProfileSecurity';

import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/profile/security',
    title: 'Security | Profile',
  });
}

export default async function ProfileSecurityPage() {
  return <ProfileSecurity />;
}
