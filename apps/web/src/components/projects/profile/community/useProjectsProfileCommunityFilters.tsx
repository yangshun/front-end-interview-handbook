import type { ProjectsDiscussionComment } from '@prisma/client';

import { useProjectsProfileCommunityFilterState } from './ProjectsProfileCommunityFilterContext';

export default function useProjectsProfileCommunityFilters() {
  const [selectedContributionType] =
    useProjectsProfileCommunityFilterState('contribution-type');
  const [selectedForumType] =
    useProjectsProfileCommunityFilterState('forum-type');

  const filterByContributionType = (comment: ProjectsDiscussionComment) =>
    selectedContributionType.length === 0 ||
    selectedContributionType.includes(comment.category ?? 'OTHER');

  const filterByForumType = (comment: ProjectsDiscussionComment) =>
    selectedForumType.length === 0 ||
    selectedForumType.includes(comment.domain);

  const filters: ReadonlyArray<
    [number, (comment: ProjectsDiscussionComment) => boolean]
  > = [
    [selectedContributionType.length, filterByContributionType],
    [selectedForumType.length, filterByForumType],
  ];

  return filters;
}
