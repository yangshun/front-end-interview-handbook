import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Pagination from '~/components/ui/Pagination';
import Text from '~/components/ui/Text';
import { themeBorderColor, themeDivideColor } from '~/components/ui/theme';

import InterviewsNotificationItem from '../notifications/InterviewsNotificationItem';
import InterviewsActivityItem from './InterviewsActivityItem';
import { categorizeActivitiesByTimeframe } from './InterviewsActivityUtils';
import type { InterviewsActivityExtended } from './types';

type Props = Readonly<{
  activities: ReadonlyArray<InterviewsActivityExtended>;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  totalCount: number;
  type: 'contributions' | 'notifications';
}>;

export default function InterviewsActivityList({
  activities,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  totalCount,
  type,
}: Props) {
  const intl = useIntl();
  const {
    activitiesInCurrMonth,
    activitiesInCurrWeek,
    activitiesInPrevMonth,
    activitiesInPrevWeek,
    activitiesOlderThanPrevMonth,
  } = categorizeActivitiesByTimeframe(activities);
  const totalPages = Math.ceil((totalCount ?? 0) / itemsPerPage);

  const groupedNotifications = [
    {
      activities: activitiesInCurrWeek,
      title: intl.formatMessage({
        defaultMessage: 'Earlier',
        description: 'Title for earlier list of activities',
        id: 'qxCTkg',
      }),
    },
    {
      activities: activitiesInPrevWeek,
      title: intl.formatMessage({
        defaultMessage: 'Last week',
        description: 'Title for last week list of activities',
        id: 'kiCj2l',
      }),
    },
    {
      activities: activitiesInCurrMonth,
      title: intl.formatMessage({
        defaultMessage: 'Earlier this month',
        description: 'Title for earlier this month list of activities',
        id: 'tnkvKb',
      }),
    },
    {
      activities: activitiesInPrevMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last month',
        description: 'Title for last month list of activities',
        id: 'Lw4leR',
      }),
    },
    {
      activities: activitiesOlderThanPrevMonth,
      title: intl.formatMessage({
        defaultMessage: 'A long time ago',
        description: 'Title for a long time ago list of activities',
        id: 'sjdndX',
      }),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        {groupedNotifications
          .filter((group) => group.activities.length > 0)
          .map(
            (group) =>
              group.activities.length !== 0 && (
                <div key={group.title} className="flex flex-col gap-2">
                  <Text size="body1" weight="medium">
                    {group.title}
                  </Text>
                  <ul
                    className={clsx(
                      'isolate rounded-lg',
                      ['divide-y', themeDivideColor],
                      ['border', themeBorderColor],
                    )}>
                    {group.activities.map((activity) =>
                      type === 'notifications' ? (
                        <InterviewsNotificationItem
                          key={activity.id}
                          activity={activity}
                        />
                      ) : (
                        <InterviewsActivityItem
                          key={activity.id}
                          activity={activity}
                        />
                      ),
                    )}
                  </ul>
                </div>
              ),
          )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2">
          <Text color="secondary" size="body3">
            {intl.formatMessage(
              {
                defaultMessage:
                  'Showing {from} to {to} of {totalCount} results',
                description: 'Results count',
                id: 'CmT/EY',
              },
              {
                from: (currentPage - 1) * itemsPerPage + 1,
                to: Math.min(currentPage * itemsPerPage, totalCount ?? 0),
                totalCount: totalCount ?? 0,
              },
            )}
          </Text>
          <Pagination
            count={totalPages}
            page={currentPage}
            onPageChange={(value) => {
              setCurrentPage(value);
            }}
          />
        </div>
      )}
    </div>
  );
}
