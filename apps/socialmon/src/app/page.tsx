'use client';

import PostList from '~/components/posts/PostList/PostList';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

export default function Page() {
  return (
    <MantineProvider>
      <PostList />
    </MantineProvider>
  );
}
