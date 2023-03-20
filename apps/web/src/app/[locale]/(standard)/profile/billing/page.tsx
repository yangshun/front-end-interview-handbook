import type { Metadata } from 'next';

import ProfileBilling from '~/components/profile/ProfileBilling';

import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/profile/billing',
    title: 'Billing | Profile',
  });
}

export default async function ProfileBillingPage() {
  return <ProfileBilling />;
}
