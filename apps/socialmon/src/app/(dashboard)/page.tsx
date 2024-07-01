import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import PostList from '~/components/posts/PostList/PostList';

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/');

  return <PostList />;
}
