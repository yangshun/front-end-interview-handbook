'use client';

import { Button, Text } from '@mantine/core';

import { trpc } from '~/hooks/trpc';
import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';

import ActivityItem from './ActivityItem';

const LIMIT = 20;

export default function ActivityLogList() {
  const projectSlug = useCurrentProjectSlug();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    trpc.activity.getAll.useInfiniteQuery(
      {
        pagination: {
          limit: LIMIT,
        },
        projectSlug,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage?.nextCursor;
        },
      },
    );

  const activities = data?.pages.flatMap((page) => page.activities);

  if (isLoading) {
    return <Text size="sm">Loading...</Text>;
  }

  if (!activities || activities.length === 0) {
    return <Text size="sm">Not activity yet!</Text>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="py-2 first:pt-0 last:pb-0">
            <ActivityItem activity={activity} />
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex w-full justify-center py-6">
          <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading more...' : 'See more'}
          </Button>
        </div>
      )}
    </div>
  );
}
