'use client';

import { Box, Button, Loader, Tabs, Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { usePostsContext } from '~/components/posts/PostsContext';

import type { PostListTab } from '~/types';

import FetchPostButton from './FetchPostButton';
import PostItem from './PostItem';

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

  // Use context instead of local state and queries
  const {
    activeTab,
    fetchNextPage,
    handlePostClick,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    posts,
    selectedPostId,
    setActiveTab,
  } = usePostsContext();

  const { data: projectData } = trpc.project.get.useQuery({
    projectSlug,
  });

  return (
    <div className={clsx('flex flex-col', 'h-full w-full')}>
      <div className="sticky w-full bg-white">
        <Tabs
          pl={8}
          pt={8}
          value={activeTab}
          variant="outline"
          onChange={(value) => setActiveTab(value as PostListTab)}>
          <Tabs.List>
            <Tabs.Tab fw={500} value="PENDING">
              Pending
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="REPLIED">
              Replied
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="IRRELEVANT">
              Irrelevant
            </Tabs.Tab>
            <Tabs.Tab fw={500} value="ALL">
              All
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div className="absolute right-2 top-2 flex items-center gap-2">
          {projectData?.postsLastFetchedAt && (
            <div className="hidden md:block">
              <Tooltip
                label={timestampFormatter.format(
                  new Date(projectData.postsLastFetchedAt),
                )}
                withArrow={true}>
                <Text c="dimmed" size="xs">
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
      <div className="h-0 grow overflow-y-auto">
        {isLoading ? (
          <Text p="xl" size="md" ta="center">
            <Loader size="md" />
          </Text>
        ) : posts?.length === 0 ? (
          <Text c="dimmed" p="xl" size="md" ta="center">
            No posts found
          </Text>
        ) : (
          <Box px={8} py={8}>
            {posts?.map((post) => (
              <PostItem
                key={post.id}
                isSelected={selectedPostId === post.id}
                post={post}
                onClick={() => handlePostClick(post.id)}
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
        )}
      </div>
    </div>
  );
}
