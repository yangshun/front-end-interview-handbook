import { useProjectsContributionFilterState } from './ProjectsContributionFilterContext';

import type { DiscussionComment } from '@prisma/client';

export default function useProjectsContributionFilters() {
  const [selectedContributionType] =
    useProjectsContributionFilterState('contribution-type');
  const [selectedForumType] = useProjectsContributionFilterState('forum-type');

  const filterByContributionType = (comment: DiscussionComment) =>
    selectedContributionType.length === 0 ||
    selectedContributionType.includes(comment.category ?? 'OTHER');

  const filterByForumType = (comment: DiscussionComment) =>
    selectedForumType.length === 0 ||
    selectedForumType.includes(comment.domain);

  const filters: ReadonlyArray<
    [number, (comment: DiscussionComment) => boolean]
  > = [
    [selectedContributionType.length, filterByContributionType],
    [selectedForumType.length, filterByForumType],
  ];

  return filters;
}
