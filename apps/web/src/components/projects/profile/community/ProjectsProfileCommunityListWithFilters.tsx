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
  targetUserId,
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
    userId: targetUserId,
  });

  const { filters } = useProjectsProfileCommunityFilterContext();

  const numberOfFilters = filtersContributionsOpts.filter(
    (filter) => filter.length > 0,
  ).length;

  const hasFilters = numberOfFilters > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-wrap gap-3">
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
        // TODO(projects): make sure this userId is meant to be the target user.
        userId={targetUserId}
      />
    </div>
  );
}

type Props = Readonly<{
  isViewingOwnProfile: boolean;
  targetUserId?: string;
}>;

export default function ProjectsProfileCommunityListWithFilters({
  isViewingOwnProfile,
  targetUserId,
}: Props) {
  return (
    <ProjectsProfileCommunityFilterContext>
      <ProjectsProfileCommunityListWithFiltersImpl
        isViewingOwnProfile={isViewingOwnProfile}
        targetUserId={targetUserId}
      />
    </ProjectsProfileCommunityFilterContext>
  );
}
