import clsx from 'clsx';
import { debounce } from 'lodash-es';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { RiNotification3Line } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeDivideEmphasizeColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

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

  const lastSeen = trpc.projects.notifications.lastSeenNotification.useMutation(
    {
      onSuccess: () => {
        utils.projects.notifications.getUnreadCount.invalidate();
      },
    },
  );

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

  // Update last seen notification timestamp
  useEffect(() => {
    lastSeen.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : notifications?.length === 0 ? (
        <div
          className={clsx(
            'h-full w-full',
            'flex flex-col items-center justify-center gap-4',
          )}>
          <RiNotification3Line
            className={clsx('size-10 shrink-0', themeTextSubtitleColor)}
          />
          <div className="flex flex-col gap-1 text-center">
            <Text size="body1" weight="medium">
              <FormattedMessage
                defaultMessage="No notification yet!"
                description="Label for no notification"
                id="hz5dJR"
              />
            </Text>
            <Text color="subtle" size="body2">
              <FormattedMessage
                defaultMessage="It looks like you don’t have any notifications at the moment. Check back here for updates on your activities, messages, and more."
                description="Description for no notification"
                id="iWvwoB"
              />
            </Text>
          </div>
        </div>
      ) : (
        <div className={clsx('divide-y', themeDivideEmphasizeColor)}>
          {notifications?.map((item, index) => (
            <div key={item.id} className={clsx('first:-mt-2.5 last:-mb-2.5')}>
              <ProjectsNotificationItem
                className={
                  index === 0
                    ? 'pt-3.5'
                    : index === notifications.length - 1
                      ? 'pb-3.5'
                      : ''
                }
                closeNotification={closeNotification}
                handleVisibleLongEnough={handleVisibleLongEnough}
                item={item}
              />
            </div>
          ))}
        </div>
      )}
      <div ref={lastItemRef} className="flex w-full justify-center">
        {isFetchingNextPage && (
          <div className="mt-8">
            <Spinner size="sm" />
          </div>
        )}
      </div>
    </>
  );
}
