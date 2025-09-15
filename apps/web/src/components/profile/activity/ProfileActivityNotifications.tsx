import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import InterviewsActivityList from '~/components/interviews/activity/InterviewsActivityList';
import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';

const ITEMS_PER_PAGE = 10;

export default function ProfileActivityNotifications() {
  const intl = useIntl();
  // Pagination
  const { currentPage, setCurrentPage } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  });
  const { data, isLoading } = trpc.notifications.list.useQuery(
    {
      pagination: {
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      },
    },
    {
      keepPreviousData: true,
    },
  );

  if (isLoading && data == null) {
    return (
      <div className="py-10">
        <Spinner display="block" />
      </div>
    );
  }

  if (data?.notifications?.length === 0 || data == null) {
    return (
      <div
        className={clsx('flex flex-col items-center justify-center', 'h-80')}>
        <div className="max-w-lg">
          <EmptyState
            subtitle={intl.formatMessage({
              defaultMessage:
                "It looks like you don't have any notifications at the moment. Check back here for updates on your activities, messages, and more.",
              description: 'Subtitle for empty state when no notifications',
              id: 'ha1wRz',
            })}
            title={intl.formatMessage({
              defaultMessage: 'No notifications yet',
              description: 'Title for empty state when no notifications',
              id: '9CjxU1',
            })}
            variant="empty"
            verticalPadding={false}
          />
        </div>
      </div>
    );
  }

  const { notifications, totalCount } = data;

  return (
    <InterviewsActivityList
      activities={notifications}
      currentPage={currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
      setCurrentPage={setCurrentPage}
      totalCount={totalCount}
      type="notifications"
    />
  );
}
