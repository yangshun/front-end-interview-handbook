import type { Metadata } from 'next';

import AccountsList from '~/components/accounts/AccountsList';
import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Accounts',
};

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/accounts');

  return <AccountsList />;
}
