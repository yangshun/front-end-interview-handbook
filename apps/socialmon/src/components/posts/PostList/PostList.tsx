'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import PostDetailSection from './PostDetailSection';
import PostItem from './PostItem';

import type { Post } from '~/types';
import type { PostTab } from '~/types';

import '@mantine/core/styles.css';

import { Button, Tabs, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const LIMIT = 20;

export default function PostList() {
  const [activeTab, setActiveTab] = useState<PostTab>('all');
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.socialPosts.getPosts.useInfiniteQuery(
      {
        filter: {
          tab: activeTab,
        },
        pagination: { limit: LIMIT },
      },
      {
        getNextPageParam(lastPage) {
          return lastPage?.nextCursor;
        },
      },
    );
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts = data?.pages.flatMap((page) => page.posts);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    open();
  };

  return (
    <div className={clsx('mx-auto h-screen max-w-screen-2xl', 'p-4', 'flex')}>
      <div
        className={clsx(
          'flex flex-col gap-2',
          'h-full w-3/5',
          'w-full lg:w-3/5',
          'lg:border-r',
        )}>
        <Title mb="md" order={2}>
          Posts from Reddit
        </Title>
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as PostTab)}>
          <Tabs.List>
            <Tabs.Tab value="all">All</Tabs.Tab>
            <Tabs.Tab value="unreplied">Unreplied</Tabs.Tab>
            <Tabs.Tab value="replied">Replied</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Text hidden={!isLoading} size="md">
          Loading...
        </Text>
        {!isLoading && posts?.length === 0 && (
          <Text size="md">No post found</Text>
        )}
        <div className={clsx('flex-1', 'overflow-y-auto', 'divide-y')}>
          {posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              selected={post.id === selectedPost?.id}
              showRepliedBadge={activeTab === 'all'}
              onClick={() => handleSelectPost(post)}
            />
          ))}

          {hasNextPage && (
            <div className="flex w-full justify-center py-6">
              <Button
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? 'Loading more...' : 'See more'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <PostDetailSection
        closeModal={close}
        openedModal={opened}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
}
