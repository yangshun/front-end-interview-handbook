import clsx from 'clsx';
import type { ProjectsChallengeInfo } from 'contentlayer/generated';
import { RiCodeSSlashLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';
import useScrollToTop from '~/hooks/useScrollToTop';

import { FormattedMessage } from '~/components/intl';
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

import { getAllProjectsChallengeMetadata } from '~/db/contentlayer/projects/ProjectsChallengeMetadataReader';

const ITEMS_PER_PAGE = 30;

type Props = Readonly<{
  challengeInfoDict: Record<string, ProjectsChallengeInfo>;
  isViewerPremium: boolean;
  type: ProjectsChallengeSubmissionTabType;
}>;

export default function ProjectsChallengeSubmissionListWithFilters({
  challengeInfoDict,
  isViewerPremium,
  type,
}: Props) {
  // Filtering.
  const {
    filters: filtersChallengesOpts,
    filterSize,
    hasClientFilterApplied,
    onChangeQuery,
    profileStatus,
    query,
    yoeExperience,
  } = useProjectsChallengeSubmissionFilters();

  // Sorting.
  const { isAscendingOrder, setIsAscendingOrder, setSortField, sortField } =
    useProjectsChallengesSorting();

  const allChallengesMetadata = getAllProjectsChallengeMetadata();
  // Processing.
  const processedChallenges = filterProjectsChallengeSubmission(
    allChallengesMetadata,
    challengeInfoDict,
    filtersChallengesOpts.map((filterFn) => filterFn),
  );
  const {
    filters,
    getStringTypeSearchParams,
    updateSearchParams,
    value: selectedFilters,
  } = useProjectsChallengeSubmissionFilterContext();

  // Pagination
  const { currentPage, setCurrentPage } = usePagination({
    deps: [selectedFilters, query, sortField, isAscendingOrder],
    itemsPerPage: ITEMS_PER_PAGE,
    page: Number(getStringTypeSearchParams('page')) || 1,
    updateSearchParams,
    updateSearchParamsRequired: true,
  });

  const { data: { submissions, totalCount } = {}, isLoading } =
    trpc.projects.submissions.list.useQuery(
      {
        filter: {
          challenges: processedChallenges.map((item) => item.slug),
          challengeSessionStatus:
            selectedFilters.status as Array<ProjectsChallengeSubmissionStatusFilter>,
          hasClientFilterApplied,
          profileStatus,
          query,
          roadmapSkills: selectedFilters['roadmap-skills'],
          submissionType: type,
          techSkills: selectedFilters['tech-stack-skills'],
          yoeExperience,
        },
        pagination: {
          limit: ITEMS_PER_PAGE,
          page: currentPage,
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
        isViewerPremium={isViewerPremium}
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
          <div className="py-10">
            <Spinner display="block" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <ProjectsChallengeSubmissionList submissions={submissions ?? []} />
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <Text color="secondary" size="body3">
                  <FormattedMessage
                    defaultMessage="Showing {startCount} to {endCount} out of {totalCount} submissions"
                    description="Pagination label"
                    id="f8ishg"
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
