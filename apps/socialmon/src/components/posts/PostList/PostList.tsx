'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import { NAVBAR_HEIGHT } from '~/constants';

import FetchPostButton from './FetchPostButton';
import PostItem from './PostItem';

import type { PostTab } from '~/types';

import { Button, Tabs, Text } from '@mantine/core';

const LIMIT = 20;

export default function PostList() {
  const projectSlug = useCurrentProjectSlug();
  const [activeTab, setActiveTab] = useState<PostTab>('all');
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.socialPosts.getPosts.useInfiniteQuery(
      {
        filter: {
          tab: activeTab,
        },
        pagination: { limit: LIMIT },
        projectSlug,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage?.nextCursor;
        },
      },
    );

  const posts = data?.pages.flatMap((page) => page.posts);

  return (
    <div className={clsx('flex flex-col gap-2', 'h-full w-full')}>
      <div
        className="sticky w-full bg-white"
        style={{ top: `${NAVBAR_HEIGHT}px` }}>
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as PostTab)}>
          <Tabs.List>
            <Tabs.Tab value="unreplied">Unreplied</Tabs.Tab>
            <Tabs.Tab value="replied">Replied</Tabs.Tab>
            <Tabs.Tab value="irrelevant">Irrelevant</Tabs.Tab>
            <Tabs.Tab value="all">All</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div className="absolute right-1 top-0.5 md:right-4">
          <FetchPostButton />
        </div>
      </div>

      <Text hidden={!isLoading} size="md">
        Loading...
      </Text>

      {!isLoading && posts?.length === 0 && (
        <Text size="md">No post found</Text>
      )}

      <div className={clsx('divide-y')}>
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            showMarkedAsIrrelevant={activeTab === 'all'}
            showRepliedBadge={activeTab === 'all'}
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
  );
}
