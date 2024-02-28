import { RiDiscussLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import EmptyState from '~/components/ui/EmptyState';
import { themeTextColor } from '~/components/ui/theme';

import ProjectsProfileCommunityCommentsSection from './ProjectsProfileCommunityCommentsSection';
import ProjectsProfileCommunityFilterContext, {
  useProjectsProfileCommunityFilterContext,
} from './ProjectsProfileCommunityFilterContext';
import ProjectsProfileCommunityFilterDropdown from './ProjectsProfileCommunityFilterDropdown';
import ProjectProfileCommunityFilterSlideOut from './ProjectsProfileCommunityFilterSlideOut';
import type { ProjectsProfileCommunityComment } from './ProjectsProfileCommunitySection';
import useProjectsProfileCommunityFilters from './useProjectsProfileCommunityFilters';

import type { ProjectsDiscussionComment } from '@prisma/client';

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsProfileCommunityComment>;
}>;

function filterProjectsProfileCommunitys<T extends ProjectsDiscussionComment>(
  contributions: ReadonlyArray<T>,
  filters: ReadonlyArray<(project: T) => boolean>,
): ReadonlyArray<T> {
  return contributions.filter((contribution) =>
    filters.every((filter) => filter(contribution)),
  );
}

function ProjectsProfileCommunityListWithFiltersImpl({ comments }: Props) {
  const intl = useIntl();
  const { filters } = useProjectsProfileCommunityFilterContext();
  const filtersContributionsOpts = useProjectsProfileCommunityFilters();

  const processedComments = filterProjectsProfileCommunitys(
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col flex-wrap gap-3 lg:flex-row">
        {filters.map((filter) => (
          <ProjectsProfileCommunityFilterDropdown
            key={filter.id}
            filter={filter}
          />
        ))}
        <ProjectProfileCommunityFilterSlideOut selected={numberOfFilters > 0} />
      </div>
      {processedComments.length === 0 ? (
        emptyState
      ) : (
        <ProjectsProfileCommunityCommentsSection comments={processedComments} />
      )}
    </div>
  );
}

export default function ProjectsProfileCommunityListWithFilters({
  comments,
}: Props) {
  return (
    <ProjectsProfileCommunityFilterContext>
      <ProjectsProfileCommunityListWithFiltersImpl comments={comments} />
    </ProjectsProfileCommunityFilterContext>
  );
}
