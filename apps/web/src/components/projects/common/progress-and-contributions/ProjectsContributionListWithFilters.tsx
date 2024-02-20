import { useState } from 'react';
import { RiDiscussLine, RiFilterLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import EmptyState from '~/components/ui/EmptyState';
import { themeTextColor } from '~/components/ui/theme';

import ProjectsAllCommentsSection from './ProjectsAllCommentsSection';
import ProjectsContributionFilterContextProvider, {
  useProjectsContributionFilterContext,
} from './ProjectsContributionFilterContext';
import ProjectsContributionFilterDropdown from './ProjectsContributionFilterDropdown';
import ProjectsContributionFilterSlideOut from './ProjectsContributionFilterSlideOut';
import type { ContributionComment } from './ProjectsContributionsSection';
import useProjectsContributionFilters from './useProjectsContributionFilters';

import type { DiscussionComment } from '@prisma/client';

type Props = Readonly<{
  comments: ReadonlyArray<ContributionComment>;
}>;

function filterProjectsContributions<T extends DiscussionComment>(
  contributions: ReadonlyArray<T>,
  filters: ReadonlyArray<(project: T) => boolean>,
): ReadonlyArray<T> {
  return contributions.filter((contribution) =>
    filters.every((filter) => filter(contribution)),
  );
}

function ProjectsContributionListWithFiltersImpl({ comments }: Props) {
  const intl = useIntl();
  const { filters } = useProjectsContributionFilterContext();
  const filtersContributionsOpts = useProjectsContributionFilters();

  const [areFiltersShown, setAreFiltersShown] = useState(false);

  const processedComments = filterProjectsContributions(
    comments,
    filtersContributionsOpts.map(([_, filterFn]) => filterFn),
  );

  const numberOfFilters = filtersContributionsOpts.filter(
    ([size]) => size > 0,
  ).length;

  const emptyState =
    numberOfFilters === 0 ? (
      <EmptyState
        icon={RiDiscussLine}
        iconClassName={themeTextColor}
        subtitle={intl.formatMessage({
          defaultMessage: 'No contributions in the community so far',
          description:
            'Subtitle for empty state when there are no contributions',
          id: 'DHQOPk',
        })}
        title={intl.formatMessage({
          defaultMessage: 'No community contributions',
          description: 'Title for empty state when there are no contributions',
          id: 'iw1XYQ',
        })}
        variant="empty"
      />
    ) : (
      <EmptyState
        icon={RiDiscussLine}
        iconClassName={themeTextColor}
        subtitle={intl.formatMessage({
          defaultMessage:
            'No contributions in the community matching those filters',
          description:
            'Subtitle for empty state when there are no contributions matching filters',
          id: 'B8uTwW',
        })}
        title={intl.formatMessage({
          defaultMessage: 'No community contributions',
          description:
            'Title for empty state when there are no contributions matching filters',
          id: 'lu/XVn',
        })}
        variant="empty"
      />
    );

  return (
    <>
      <ProjectsContributionFilterSlideOut
        isShown={areFiltersShown}
        onClose={() => {
          setAreFiltersShown(false);
        }}
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col flex-wrap gap-3 lg:flex-row">
          {filters.map((filter) => (
            <ProjectsContributionFilterDropdown
              key={filter.id}
              filter={filter}
            />
          ))}
          <FilterButton
            icon={RiFilterLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'All filters',
              description: 'Label for All Filters button for projects list',
              id: 'i9ojv3',
            })}
            purpose="button"
            selected={numberOfFilters > 0}
            size="md"
            tooltip={intl.formatMessage({
              defaultMessage: 'View all filters',
              description: 'Tooltip for All Filters button for projects list',
              id: 'vHNURr',
            })}
            onClick={() => {
              setAreFiltersShown(true);
            }}
          />
        </div>
        {processedComments.length === 0 ? (
          emptyState
        ) : (
          <ProjectsAllCommentsSection comments={processedComments} />
        )}
      </div>
    </>
  );
}

export default function ProjectsContributionListWithFilters({
  comments,
}: Props) {
  return (
    <ProjectsContributionFilterContextProvider>
      <ProjectsContributionListWithFiltersImpl comments={comments} />
    </ProjectsContributionFilterContextProvider>
  );
}
