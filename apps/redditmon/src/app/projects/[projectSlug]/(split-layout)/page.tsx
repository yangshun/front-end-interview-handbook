import type { Metadata } from 'next';

import PostList from '~/components/posts/PostList/PostList';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'Redditmon | Posts',
};

export default function Page() {
  // Auth check moved to layout
  return <PostList />;
}
