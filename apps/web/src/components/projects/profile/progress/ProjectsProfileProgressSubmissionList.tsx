'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';

import ProjectsChallengeSubmissionCard from '../../submissions/lists/ProjectsChallengeSubmissionCard';

type Props = Readonly<{
  emptyState: React.ReactElement;
  targetUserId: string;
}>;

const ITEMS_PER_PAGE = 12;

export default function ProjectsProfileProgressSubmissionList({
  emptyState,
  targetUserId,
}: Props) {
  const { data: submissions, isLoading: isLoadingSubmissions } =
    trpc.projects.submissions.listCompleted.useQuery({
      orderBy: 'desc',
      userId: targetUserId,
    });

  const {
    currentPage: currentPageSubmissions,
    currentPageItems: currentPageItemsSubmissions,
    setCurrentPage: setCurrentPageSubmissions,
    totalPages: totalPagesSubmissions,
  } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    totalList: submissions,
  });

  if (isLoadingSubmissions) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (
    !currentPageItemsSubmissions ||
    currentPageItemsSubmissions.length === 0
  ) {
    return emptyState;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={clsx('grid gap-6', 'md:grid-cols-2', 'xl:grid-cols-3')}>
        {currentPageItemsSubmissions.map((submission) => (
          <ProjectsChallengeSubmissionCard
            key={submission.id}
            challenge={submission.challenge}
            submission={submission}
          />
        ))}
      </div>
      {totalPagesSubmissions > 1 && (
        <div className="flex items-center justify-between">
          <Pagination
            count={totalPagesSubmissions}
            page={currentPageSubmissions}
            onPageChange={(value) => setCurrentPageSubmissions(value)}
          />
        </div>
      )}
    </div>
  );
}
