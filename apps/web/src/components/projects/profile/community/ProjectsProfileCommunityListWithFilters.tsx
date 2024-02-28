import ProjectsProfileCommunityCommentsSection from './ProjectsProfileCommunityCommentsSection';
import ProjectsProfileCommunityFilterContext, {
  useProjectsProfileCommunityFilterContext,
} from './ProjectsProfileCommunityFilterContext';
import ProjectsProfileCommunityFilterDropdown from './ProjectsProfileCommunityFilterDropdown';
import ProjectProfileCommunityFilterSlideOut from './ProjectsProfileCommunityFilterSlideOut';
import type { ProjectsProfileCommunityComment } from './ProjectsProfileCommunitySection';
import useProjectsProfileCommunityFilters from './useProjectsProfileCommunityFilters';

import type { ProjectsDiscussionComment } from '@prisma/client';

function filterProjectsProfileCommunityComments<
  T extends ProjectsDiscussionComment,
>(
  contributions: ReadonlyArray<T>,
  filters: ReadonlyArray<(project: T) => boolean>,
): ReadonlyArray<T> {
  return contributions.filter((contribution) =>
    filters.every((filter) => filter(contribution)),
  );
}

function ProjectsProfileCommunityListWithFiltersImpl({
  comments,
  isViewingOwnProfile,
}: Props) {
  const { filters } = useProjectsProfileCommunityFilterContext();
  const filtersContributionsOpts = useProjectsProfileCommunityFilters();

  // TODO(projects): move to server-side filtering.
  const processedComments = filterProjectsProfileCommunityComments(
    comments,
    filtersContributionsOpts.map(([_, filterFn]) => filterFn),
  );

  const numberOfFilters = filtersContributionsOpts.filter(
    ([size]) => size > 0,
  ).length;

  const hasFilters = numberOfFilters > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col flex-wrap gap-3 lg:flex-row">
        {filters.map((filter) => (
          <ProjectsProfileCommunityFilterDropdown
            key={filter.id}
            filter={filter}
          />
        ))}
        <ProjectProfileCommunityFilterSlideOut selected={hasFilters} />
      </div>
      <ProjectsProfileCommunityCommentsSection
        comments={processedComments}
        hasFilters={hasFilters}
        isViewingOwnProfile={isViewingOwnProfile}
      />
    </div>
  );
}

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsProfileCommunityComment>;
  isViewingOwnProfile: boolean;
}>;

export default function ProjectsProfileCommunityListWithFilters({
  comments,
  isViewingOwnProfile,
}: Props) {
  return (
    <ProjectsProfileCommunityFilterContext>
      <ProjectsProfileCommunityListWithFiltersImpl
        comments={comments}
        isViewingOwnProfile={isViewingOwnProfile}
      />
    </ProjectsProfileCommunityFilterContext>
  );
}
