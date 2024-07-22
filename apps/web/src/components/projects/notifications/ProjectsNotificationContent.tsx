import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { debounce } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import ProjectsNotificationItem from './ProjectsNotificationItem';

const LIMIT = 10;

type Props = Readonly<{ closeNotification: () => void }>;

export default function ProjectsNotificationContent({
  closeNotification,
}: Props) {
  const utils = trpc.useUtils();
  const lastItemRef = useRef(null);
  const isLastItemVisible = useInView(lastItemRef, {
    amount: 'some',
  });
  const [unreadVisibleNotificationIds, setUnreadVisibleNotificationIds] =
    useState<Set<string>>(new Set());

  const markAsRead = trpc.projects.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.projects.notifications.list.invalidate();
      utils.projects.notifications.getUnreadCount.invalidate();
    },
  });

  const debounceMarkAsRead = useRef(
    debounce((ids: Array<string>) => {
      setUnreadVisibleNotificationIds(new Set());
      markAsRead.mutate({
        ids,
      });
    }, 1000),
  ).current;

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    trpc.projects.notifications.list.useInfiniteQuery(
      {
        pagination: { limit: LIMIT },
      },
      {
        getNextPageParam(lastPage) {
          return lastPage?.nextCursor;
        },
      },
    );

  const handleVisibleLongEnough = (id: string) => {
    setUnreadVisibleNotificationIds((prevSet) => {
      const newSet = new Set(prevSet);

      newSet.add(id);

      return newSet;
    });
  };

  // Fetch next page
  useEffect(() => {
    if (isLastItemVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isLastItemVisible, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // Trigger markAsRead for visible unread notifications
  useEffect(() => {
    if (unreadVisibleNotificationIds.size > 0) {
      debounceMarkAsRead(Array.from(unreadVisibleNotificationIds));
    }
  }, [unreadVisibleNotificationIds, debounceMarkAsRead]);

  const notifications = data?.pages.flatMap((page) => page.notifications);

  return (
    <div>
      <div className={clsx('divide-y', themeDivideEmphasizeColor)}>
        {isLoading ? (
          <div className="flex w-full justify-center">
            <Spinner size="sm" />
          </div>
        ) : notifications?.length === 0 ? (
          <Text>
            <FormattedMessage
              defaultMessage="No notification yet!"
              description="Label for no notification"
              id="hz5dJR"
            />
          </Text>
        ) : (
          notifications?.map((item) => (
            <div key={item.id} className="py-6 first:pt-0 last:pb-0">
              <ProjectsNotificationItem
                closeNotification={closeNotification}
                handleVisibleLongEnough={handleVisibleLongEnough}
                item={item}
              />
            </div>
          ))
        )}
      </div>
      <div ref={lastItemRef} className="flex w-full justify-center">
        {isFetchingNextPage && (
          <div className="my-4">
            <Spinner size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}
