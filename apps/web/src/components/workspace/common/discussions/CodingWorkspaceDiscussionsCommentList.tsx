import type { InterviewsDiscussionCommentDomain } from '@prisma/client';
import clsx from 'clsx';
import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import { useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import EmptyState from '~/components/ui/EmptyState';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import CodingWorkspaceDiscussionsComment from './CodingWorkspaceDiscussionsComment';
import type { CodingWorkspaceDiscussionsCommentSortField } from './types';

type Props = Readonly<{
  domain: InterviewsDiscussionCommentDomain;
  entityId: string;
  onUpdateCommentsCount: (value: number) => void;
  sort: {
    field: CodingWorkspaceDiscussionsCommentSortField;
    isAscendingOrder: boolean;
  };
}>;

const ITEMS_PER_PAGE = 10;

export default function CodingWorkspaceDiscussionsCommentList({
  domain,
  entityId,
  onUpdateCommentsCount,
  sort,
}: Props) {
  const intl = useIntl();
  // Pagination
  const { currentPage, setCurrentPage } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  });
  const { data, isLoading } = trpc.questionComments.list.useQuery(
    {
      domain,
      entityId,
      pagination: {
        limit: ITEMS_PER_PAGE,
        page: currentPage,
      },
      sort,
    },
    {
      keepPreviousData: true,
    },
  );
  const { comments, count } = data ?? {};

  // Update the comments count when data changes
  useEffect(() => {
    if (count != null) {
      onUpdateCommentsCount(count);
    }
  }, [count, onUpdateCommentsCount]);

  if (isLoading && comments?.length !== 0) {
    return (
      <div className="p-18 w-full">
        <Spinner display="block" />
      </div>
    );
  }

  if (comments?.length === 0 || !comments) {
    return (
      <EmptyState
        title={intl.formatMessage({
          defaultMessage: 'No comments yet',
          description: 'No comment title',
          id: '9QBgga',
        })}
      />
    );
  }

  const totalPages = Math.ceil((count ?? 0) / ITEMS_PER_PAGE);

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <CodingWorkspaceDiscussionsComment comment={comment} />
          {index !== comments.length - 1 && <Divider className="mb-1.5" />}
        </div>
      ))}
      {(count ?? 0) > 0 && (
        <div
          className={clsx('flex items-center justify-between gap-1', 'mt-2.5')}>
          <Text color="secondary" size="body3">
            {intl.formatMessage(
              {
                defaultMessage:
                  'Showing {from} to {to} comments out of {totalCount} discussions',
                description: 'Comments count',
                id: 'zJP+bP',
              },
              {
                from: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                to: Math.min(currentPage * ITEMS_PER_PAGE, count ?? 0),
                totalCount: count ?? 0,
              },
            )}
          </Text>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onPageChange={(value) => {
                setCurrentPage(value);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
