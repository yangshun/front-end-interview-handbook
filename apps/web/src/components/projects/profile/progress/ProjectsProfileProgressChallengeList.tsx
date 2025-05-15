'use client';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';

type Props = Readonly<{
  challengeStatus: ProjectsChallengeSessionStatus;
  emptyState: React.ReactElement;
  isViewerPremium: boolean;
  targetUserId: string;
}>;

const ITEMS_PER_PAGE = 6;

export default function ProjectsProfileProgressChallengeList({
  challengeStatus,
  emptyState,
  isViewerPremium,
  targetUserId,
}: Props) {
  const { data: sessions, isLoading: isLoadingSessions } =
    trpc.projects.sessions.list.useQuery({
      orderBy: 'desc',
      statuses: [challengeStatus],
      userId: targetUserId,
    });

  const shownSessions = sessions?.filter(
    (session, index, self) =>
      self.findIndex(
        (session_) =>
          session_.challenge?.metadata.slug ===
          session.challenge?.metadata.slug,
      ) === index,
  );

  // Pagination
  const {
    currentPageItems: currentPageItemsSessions,
    totalPages: totalPagesSessions,
    setCurrentPage: setCurrentPageSessions,
    currentPage: currentPageSessions,
  } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    totalList: shownSessions,
  });

  if (isLoadingSessions) {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  if (!currentPageItemsSessions || currentPageItemsSessions.length === 0) {
    return emptyState;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className={clsx('grid gap-6', 'md:grid-cols-2', 'xl:grid-cols-3')}>
        {currentPageItemsSessions.map((session) =>
          session.challenge ? (
            <ProjectsChallengeCard
              key={session.id}
              challenge={session.challenge}
              isViewerPremium={isViewerPremium}
              variant="card"
            />
          ) : null,
        )}
      </div>
      {totalPagesSessions > 1 && (
        <div className="flex items-center justify-between">
          <Pagination
            count={totalPagesSessions}
            page={currentPageSessions}
            onPageChange={(value) => setCurrentPageSessions(value)}
          />
        </div>
      )}
    </div>
  );
}
