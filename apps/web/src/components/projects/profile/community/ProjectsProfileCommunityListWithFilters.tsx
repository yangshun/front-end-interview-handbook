import { trpc } from '~/hooks/trpc';

import ProjectsProfileCommunityCommentsSection from './ProjectsProfileCommunityCommentsSection';
import ProjectsProfileCommunityFilterContext, {
  useProjectsProfileCommunityFilterContext,
} from './ProjectsProfileCommunityFilterContext';
import { useProjectsProfileCommunityFilterState } from './ProjectsProfileCommunityFilterContext';
import ProjectsProfileCommunityFilterDropdown from './ProjectsProfileCommunityFilterDropdown';
import ProjectProfileCommunityFilterSlideOut from './ProjectsProfileCommunityFilterSlideOut';

import type { ProjectsDiscussionCommentDomain } from '@prisma/client';

function ProjectsProfileCommunityListWithFiltersImpl({
  isViewingOwnProfile,
  userId,
}: Props) {
  const domainList: Array<ProjectsDiscussionCommentDomain> = [
    'PROJECTS_SUBMISSION',
    'PROJECTS_CHALLENGE',
  ];

  const [selectedContributionType] =
    useProjectsProfileCommunityFilterState('contribution-type');
  const [selectedForumType] =
    useProjectsProfileCommunityFilterState('forum-type');
  const filtersContributionsOpts = [
    selectedContributionType,
    selectedForumType,
  ];

  const { data: comments } = trpc.projects.comments.listUserComments.useQuery({
    contributionType: selectedContributionType,
    domainList,
    forumType: selectedForumType,
    userId,
  });

  const { filters } = useProjectsProfileCommunityFilterContext();

  const numberOfFilters = filtersContributionsOpts.filter(
    (filter) => filter.length > 0,
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
        comments={comments ?? []}
        hasFilters={hasFilters}
        isViewingOwnProfile={isViewingOwnProfile}
        userId={userId}
      />
    </div>
  );
}

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  userId?: string;
}>;

export default function ProjectsProfileCommunityListWithFilters({
  isViewingOwnProfile,
  userId,
}: Props) {
  return (
    <ProjectsProfileCommunityFilterContext>
      <ProjectsProfileCommunityListWithFiltersImpl
        isViewingOwnProfile={isViewingOwnProfile}
        userId={userId}
      />
    </ProjectsProfileCommunityFilterContext>
  );
}
