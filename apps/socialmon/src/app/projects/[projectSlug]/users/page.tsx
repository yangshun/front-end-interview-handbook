import type { Metadata } from 'next';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import UsersList from '~/components/users/UsersList';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Users',
};

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/accounts');

  return <UsersList />;
}
