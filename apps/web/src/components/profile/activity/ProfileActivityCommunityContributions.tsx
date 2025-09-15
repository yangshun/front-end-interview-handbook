import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import InterviewsActivityList from '~/components/interviews/activity/InterviewsActivityList';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';

const ITEMS_PER_PAGE = 10;

export default function ProfileActivityCommunityContributions() {
  const intl = useIntl();
  // Pagination
  const { currentPage, setCurrentPage } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  });
  const { data, isLoading } = trpc.communityContributions.list.useQuery(
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

  if (data?.contributions?.length === 0 || data == null) {
    return (
      <div
        className={clsx('flex flex-col items-center justify-center', 'h-80')}>
        <div className="max-w-[312px]">
          <EmptyState
            subtitle={intl.formatMessage({
              defaultMessage:
                'Start sharing your thoughts or solutions — your contributions will appear here.',
              description: 'Subtitle for empty state when no contributions',
              id: 'u1CNz+',
            })}
            title={intl.formatMessage({
              defaultMessage: 'No community activity yet',
              description: 'Title for empty state when no contributions',
              id: 'iSFz8P',
            })}
            variant="empty"
            verticalPadding={false}
          />
        </div>
        <Button
          className="mt-6"
          href="/interviews/dashboard"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Dashboard',
            description: 'Link to dashboard page',
            id: 'vi10y1',
          })}
          size="sm"
          variant="primary"
        />
      </div>
    );
  }

  const { contributions, totalCount } = data;

  return (
    <InterviewsActivityList
      activities={contributions}
      currentPage={currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
      setCurrentPage={setCurrentPage}
      totalCount={totalCount}
      type="contributions"
    />
  );
}
