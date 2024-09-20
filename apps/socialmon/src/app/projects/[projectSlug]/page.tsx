import type { Metadata } from 'next';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import PostList from '~/components/posts/PostList/PostList';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Posts',
};

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/');

  return <PostList />;
}
