'use client';

import { Button, Tabs, Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import { NAVBAR_HEIGHT } from '~/constants';
import type { PostTab } from '~/types';

import FetchPostButton from './FetchPostButton';
import PostItem from './PostItem';

const LIMIT = 20;

const timestampFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  hour: 'numeric',
  hour12: true,
  minute: '2-digit',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
});

export default function PostList() {
  const projectSlug = useCurrentProjectSlug();
  const [activeTab, setActiveTab] = useState<PostTab>('all');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
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
  const { data: projectData } = trpc.project.get.useQuery({
    projectSlug,
  });

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
        <div className="absolute right-1 top-0.5 flex items-center gap-2 md:right-4">
          {projectData?.postsLastFetchedAt && (
            <div className="hidden md:block">
              <Tooltip
                label={timestampFormatter.format(
                  new Date(projectData.postsLastFetchedAt),
                )}
                withArrow={true}>
                <Text size="sm">
                  Fetched{' '}
                  <RelativeTimestamp
                    timestamp={new Date(projectData.postsLastFetchedAt)}
                  />
                </Text>
              </Tooltip>
            </div>
          )}
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
