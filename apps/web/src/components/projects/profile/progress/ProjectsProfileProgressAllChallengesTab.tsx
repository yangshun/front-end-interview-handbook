'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiRocketLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import FilterButton from '~/components/common/FilterButton';
import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import useProjectsAllChallengesFilterOptions from '~/components/projects/profile/progress/useProjectsAllChallengesFilterOptions';
import CheckboxInput from '~/components/ui/CheckboxInput';
import EmptyState from '~/components/ui/EmptyState';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';
import { themeTextColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionCard from '../../submissions/lists/ProjectsChallengeSubmissionCard';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  targetUserId: string;
}>;

const ITEMS_PER_PAGE = 6;

export default function ProjectsProfileProgressAllChallengesTab({
  isViewingOwnProfile,
  isViewerPremium,
  targetUserId,
}: Props) {
  const intl = useIntl();
  const [showAsSubmissions, setShowAsSubmissions] = useState(true);
  const [challengeStatusFilter, setChallengeStatusFilter] =
    useSessionStorage<ProjectsChallengeSessionStatus>(
      `gfe:projects:all-challenges:status-filter`,
      'IN_PROGRESS',
    );
  const { name: filterName, options: filterOptions } =
    useProjectsAllChallengesFilterOptions();

  const fetchSubmissions =
    challengeStatusFilter === 'COMPLETED' && showAsSubmissions;

  const { data: sessions, isLoading: isLoadingSessions } =
    trpc.projects.sessions.list.useQuery(
      {
        orderBy: 'desc',
        statuses: [challengeStatusFilter],
        userId: targetUserId,
      },
      {
        enabled: !fetchSubmissions,
      },
    );
  const shownSessions = sessions?.filter(
    (session, index, self) =>
      self.findIndex(
        (s) => s.challenge?.metadata.slug === session.challenge?.metadata.slug,
      ) === index,
  );

  const { data: submissions, isLoading: isLoadingSubmissions } =
    trpc.projects.submissions.listCompleted.useQuery(
      {
        orderBy: 'desc',
        userId: targetUserId,
      },
      {
        enabled: fetchSubmissions,
      },
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

  const {
    currentPageItems: currentPageItemsSubmissions,
    totalPages: totalPagesSubmissions,
    setCurrentPage: setCurrentPageSubmissions,
    currentPage: currentPageSubmissions,
  } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    totalList: submissions,
  });

  const emptyState = (
    <EmptyState
      icon={RiRocketLine}
      iconClassName={themeTextColor}
      subtitle={
        isViewingOwnProfile
          ? intl.formatMessage({
              defaultMessage:
                'You have not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'vvPx/k',
            })
          : intl.formatMessage({
              defaultMessage:
                'This user has not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'Dt0MpD',
            })
      }
      title={intl.formatMessage({
        defaultMessage: 'No projects matching those filters',
        description: 'Title for no projects yet on projects progress tab',
        id: '+uw4/h',
      })}
    />
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center gap-4">
        <fieldset>
          <legend className="sr-only">{filterName}</legend>
          <div className={clsx('flex flex-wrap items-center gap-2')}>
            {filterOptions.map(({ icon: Icon, ...option }) => (
              <FilterButton
                key={option.value}
                icon={Icon}
                label={String(option.label)}
                purpose="tab"
                selected={challengeStatusFilter === option.value}
                tooltip={option.tooltip}
                onClick={() => {
                  setChallengeStatusFilter(option.value);
                }}
              />
            ))}
          </div>
        </fieldset>
        {challengeStatusFilter === 'COMPLETED' && (
          <CheckboxInput
            label={intl.formatMessage({
              defaultMessage: 'Show as submissions',
              description: 'Checkbox label for showing as submissions',
              id: '6O2Mng',
            })}
            size="sm"
            value={showAsSubmissions}
            onChange={(value) => {
              setShowAsSubmissions(value);
            }}
          />
        )}
      </div>
      {/* TODO(projects): extract out as components. */}
      {(() => {
        if (fetchSubmissions) {
          if (isLoadingSubmissions) {
            return (
              <div className="flex h-80 w-full items-center justify-center">
                <Spinner size="md" />
              </div>
            );
          }

          if (
            currentPageItemsSubmissions &&
            currentPageItemsSubmissions.length !== 0
          ) {
            return (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
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

          return emptyState;
        }

        if (isLoadingSessions) {
          return (
            <div className="flex h-80 w-full items-center justify-center">
              <Spinner size="md" />
            </div>
          );
        }

        if (currentPageItemsSessions && currentPageItemsSessions.length !== 0) {
          return (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
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

        return emptyState;
      })()}
    </div>
  );
}
