import clsx from 'clsx';
import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';
import useScrollToTop from '~/hooks/useScrollToTop';

import useProjectsChallengeSubmissionFilters from '~/components/projects/submissions/lists/filters/hooks/useProjectsChallengeSubmissionFilters';
import useProjectsChallengesSorting from '~/components/projects/submissions/lists/filters/hooks/useProjectsChallengeSubmissionSorting';
import { useProjectsChallengeSubmissionFilterContext } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionFilters from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilters';
import { filterProjectsChallengeSubmission } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionProcessor';
import ProjectsChallengeSubmissionList from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionList';
import type {
  ProjectsChallengeSubmissionStatusFilter,
  ProjectsChallengeSubmissionTabType,
} from '~/components/projects/submissions/types';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundGlimmerColor,
  themeIconColor,
} from '~/components/ui/theme';

const ITEMS_PER_PAGE = 12;

type Props = Readonly<{
  type: ProjectsChallengeSubmissionTabType;
}>;

export default function ProjectsChallengeSubmissionListWithFilters({
  type,
}: Props) {
  // Filtering.
  const {
    query,
    onChangeQuery,
    filters: filtersChallengesOpts,
    filterSize,
    profileStatus,
    yoeExperience,
    hasClientFilterApplied,
  } = useProjectsChallengeSubmissionFilters();

  // Sorting.
  const { isAscendingOrder, setIsAscendingOrder, sortField, setSortField } =
    useProjectsChallengesSorting();

  // Processing.
  const processedChallenges = filterProjectsChallengeSubmission(
    allProjectsChallengeMetadata,
    filtersChallengesOpts.map((filterFn) => filterFn),
  );
  const {
    filters,
    value: selectedFilters,
    updateSearchParams,
    getStringTypeSearchParams,
  } = useProjectsChallengeSubmissionFilterContext();

  // Pagination
  const { setCurrentPage, currentPage } = usePagination(
    [],
    ITEMS_PER_PAGE,
    [selectedFilters, query, sortField, isAscendingOrder],
    Number(getStringTypeSearchParams('page')) || 1,
    true,
  );

  const { data: { submissions, totalCount } = {}, isLoading } =
    trpc.projects.submissions.list.useQuery(
      {
        filter: {
          challengeSessionStatus:
            selectedFilters.status as Array<ProjectsChallengeSubmissionStatusFilter>,
          challenges: processedChallenges.map((item) => item.slug),
          hasClientFilterApplied,
          profileStatus,
          query,
          roadmapSkills: selectedFilters.roadmapSkills,
          submissionType: type,
          techSkills: selectedFilters.techStackSkills,
          yoeExperience,
        },
        pagination: {
          currentPage,
          itemPerPage: ITEMS_PER_PAGE,
        },
        sort: { field: sortField, isAscendingOrder },
      },
      {
        keepPreviousData: true,
      },
    );

  const totalPages = Math.ceil((totalCount ?? 0) / ITEMS_PER_PAGE);

  useScrollToTop([currentPage]);

  return (
    <div className="flex flex-col gap-6">
      <ProjectsChallengeSubmissionFilters
        filterSize={filterSize}
        filters={filters}
        isAscendingOrder={isAscendingOrder}
        query={query ?? ''}
        setIsAscendingOrder={setIsAscendingOrder}
        setQuery={onChangeQuery}
        setSortField={setSortField}
        sortField={sortField}
      />
      <div className="flex flex-col gap-y-4">
        <div className={clsx('flex items-center gap-2')}>
          <RiCodeSSlashLine
            className={clsx('size-4 shrink-0', themeIconColor)}
          />
          {isLoading ? (
            // TODO(ui): create glimmer component.
            <div
              className={clsx(
                'h-2 min-w-[80px] animate-pulse rounded',
                themeBackgroundGlimmerColor,
              )}
            />
          ) : (
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="{totalCount} submissions"
                description="Total number of projects submissions"
                id="+B60u6"
                values={{
                  totalCount,
                }}
              />
            </Text>
          )}
        </div>
        {isLoading && !submissions ? (
          <Spinner display="block" size="lg" />
        ) : (
          <div className="flex flex-col gap-6">
            <ProjectsChallengeSubmissionList submissions={submissions ?? []} />
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <Text color="secondary" size="body3">
                  <FormattedMessage
                    defaultMessage="Showing {startCount} to {endCount} out of {totalCount} projects"
                    description="Projects listing label"
                    id="HIz7N5"
                    values={{
                      endCount:
                        (currentPage - 1) * ITEMS_PER_PAGE +
                        (submissions ?? []).length,
                      startCount: (currentPage - 1) * ITEMS_PER_PAGE + 1,
                      totalCount,
                    }}
                  />
                </Text>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onPageChange={(value) => {
                    setCurrentPage(value);
                    updateSearchParams('page', value.toString());
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
