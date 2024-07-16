import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeDivideColor } from '~/components/ui/theme';

import ProjectsNotificationItem from './ProjectsNotificationItem';

const LIMIT = 10;

type Props = Readonly<{ closeNotification: () => void }>;

export default function ProjectsNotificationContent({
  closeNotification,
}: Props) {
  const lastItemRef = useRef(null);

  const isLastItemVisible = useInView(lastItemRef, {
    amount: 'some',
  });
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

  useEffect(() => {
    if (isLastItemVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isLastItemVisible, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const notifications = data?.pages.flatMap((page) => page.notifications);

  return (
    <div className={clsx('flex flex-col gap-4')}>
      <div className={clsx('divide-y', themeDivideColor)}>
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
                item={item}
              />
            </div>
          ))
        )}
      </div>
      <div ref={lastItemRef} className="flex w-full justify-center">
        {isFetchingNextPage && <Spinner size="sm" />}
      </div>
    </div>
  );
}
