'use client';

import { Box, Button, Tabs, Text, Tooltip } from '@mantine/core';
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
    <div className={clsx('flex flex-col', 'w-full')}>
      <div
        className="sticky w-full bg-white pt-4"
        style={{ top: `${NAVBAR_HEIGHT}px` }}>
        <Tabs
          value={activeTab}
          variant="outline"
          onChange={(value) => setActiveTab(value as PostTab)}>
          <Tabs.List>
            <Tabs.Tab fw={500} value="unreplied">
              Unreplied
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="replied">
              Replied
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="irrelevant">
              Irrelevant
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="all">
              All
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div className="absolute right-0 top-3 flex items-center gap-2">
          {projectData?.postsLastFetchedAt && (
            <div className="hidden md:block">
              <Tooltip
                label={timestampFormatter.format(
                  new Date(projectData.postsLastFetchedAt),
                )}
                withArrow={true}>
                <Text c="dimmed" size="sm">
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
      <Box py={4}>
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
              variant="default"
              onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Loading more...' : 'See more'}
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
}
