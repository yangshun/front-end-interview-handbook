import { useState } from 'react';
import { RiFilterLine, RiFolderOpenLine } from 'react-icons/ri';
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
import type { ContributionComment } from './ProjectsProgressAndContributionsSection';
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
  const { filters: filtersContributionsOpts } =
    useProjectsContributionFilters();

  const [areFiltersShown, setAreFiltersShown] = useState(false);

  const processedComments = filterProjectsContributions(
    comments,
    filtersContributionsOpts.map(([_, filterFn]) => filterFn),
  );

  const numberOfFilters = filtersContributionsOpts.filter(
    ([size]) => size > 0,
  ).length;

  const emptyState = (
    <div className="p-10">
      <EmptyState
        icon={RiFolderOpenLine}
        iconClassName={themeTextColor}
        subtitle={intl.formatMessage({
          defaultMessage:
            "Adjust your filters a bit, and let's see what we can find!",
          description:
            'Subtitle for empty state when no comments are returned from application of filters on comments list',
          id: 'KugqYl',
        })}
        title={intl.formatMessage({
          defaultMessage: 'Nothing found just yet',
          description:
            'Title for empty state when application of filters return no results',
          id: 'SdYw31',
        })}
        variant="empty"
      />
    </div>
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
        <div className="flex gap-3 flex-wrap lg:flex-row flex-col">
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
