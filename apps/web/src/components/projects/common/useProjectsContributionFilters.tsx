import { useState } from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import { useProjectsContributionFilterState } from './ProjectsContributionFilterContext';

import type { DiscussionComment } from '@prisma/client';

export default function useProjectsContributionFilters() {
  const { updateSearchParams, getStringTypeSearchParams } =
    useFilterSearchParams();
  // Filtering.
  const [query, setQuery] = useState(getStringTypeSearchParams('search'));
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

  const onChangeQuery = (value: string) => {
    setQuery(value);
    updateSearchParams('search', value);
    // Reset page number on URL when query changes
    updateSearchParams('page', '1');
  };

  return {
    filters,
    onChangeQuery,
    query,
  };
}
