import { useProjectsContributionFilterState } from './ProjectsContributionFilterContext';

import type { ProjectsDiscussionComment } from '@prisma/client';

export default function useProjectsContributionFilters() {
  const [selectedContributionType] =
    useProjectsContributionFilterState('contribution-type');
  const [selectedForumType] = useProjectsContributionFilterState('forum-type');

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
