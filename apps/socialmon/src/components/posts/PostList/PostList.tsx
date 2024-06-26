'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import PostDetailSection from './PostDetailSection';
import PostItem from './PostItem';

import type { Post } from '~/types';

import '@mantine/core/styles.css';

import { Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function PostList() {
  const { isLoading, data } = trpc.socialPosts.getUnrepliedPosts.useQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    open();
  };

  // TODO: tab for replied posts
  return (
    <div className={clsx('mx-auto h-screen max-w-screen-2xl', 'p-4', 'flex')}>
      <div
        className={clsx(
          'flex flex-col gap-2',
          'h-full w-3/5',
          'w-full lg:w-3/5',
        )}>
        <div className="">
          <Title mb="md" order={2}>
            Unreplied Posts for Reddit
          </Title>
        </div>
        <Text hidden={!isLoading} size="md">
          Loading...
        </Text>
        {!isLoading && data?.length === 0 && (
          <Text size="md">No post found</Text>
        )}
        <div className={clsx('flex-1', 'overflow-y-auto', 'divide-y')}>
          {data?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onClick={() => handleSelectPost(post)}
            />
          ))}
        </div>
      </div>
      <PostDetailSection
        closeModal={close}
        openedModal={opened}
        selectedPost={selectedPost}
      />
    </div>
  );
}
