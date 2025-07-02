'use client';

import { Box, Button, Loader, Tabs, Text, Tooltip } from '@mantine/core';
import clsx from 'clsx';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

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
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<PostTab>('all');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // Sync selection with URL - if we're viewing a post, select it in the list
  useEffect(() => {
    if (params?.id && typeof params.id === 'string') {
      setSelectedPostId(params.id);
    } else {
      setSelectedPostId(null);
    }
  }, [params?.id]);

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

  // Handle post selection and navigation
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    router.push(`/projects/${projectSlug}/posts/${postId}`);
  };

  return (
    <div className={clsx('flex flex-col', 'h-full w-full')}>
      <div className="sticky w-full bg-white">
        <Tabs
          pl={8}
          pt={8}
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
        <div className="absolute right-2 top-2 flex items-center gap-2">
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
          <Box className="divide-y divide-neutral-200">
            {posts?.map((post) => (
              <PostItem
                key={post.id}
                isSelected={selectedPostId === post.id}
                post={post}
                showMarkedAsIrrelevant={activeTab === 'all'}
                showRepliedBadge={activeTab === 'all'}
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
