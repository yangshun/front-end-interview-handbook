import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { useState } from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import { useProjectsChallengeSubmissionFilterState } from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import type { ProjectsChallengeSubmissionYOEFilter } from '~/components/projects/submissions/types';
import type { YOEReplacement } from '~/components/projects/types';

export default function useProjectsChallengeSubmissionFilters() {
  const { updateSearchParams, getStringTypeSearchParams } =
    useFilterSearchParams();
  // Filtering.
  const [query, setQuery] = useState(getStringTypeSearchParams('search'));
  const [selectedComponentTrack] =
    useProjectsChallengeSubmissionFilterState('component-track');
  const [selectedDifficulty] =
    useProjectsChallengeSubmissionFilterState('difficulty');
  const [selectedStatus] = useProjectsChallengeSubmissionFilterState('status');
  const [selectedExperience] =
    useProjectsChallengeSubmissionFilterState('experience');

  const projectsMatchesTextQuery = (
    project: ProjectsChallengeMetadata,
    searchQuery: string,
  ) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase());

  const filterByComponentTrack = (project: ProjectsChallengeMetadata) =>
    selectedComponentTrack.length === 0 ||
    selectedComponentTrack.includes(project.track);

  const filterByDifficulty = (project: ProjectsChallengeMetadata) =>
    selectedDifficulty.length === 0 ||
    selectedDifficulty.includes(project.difficulty);

  const filters: ReadonlyArray<
    (project: ProjectsChallengeMetadata) => boolean
  > = [
    // Query.
    (project) => projectsMatchesTextQuery(project, query),
    // Component Track.
    filterByComponentTrack,
    // Difficulty.
    filterByDifficulty,
  ];

  const experienceOptions = useProjectsYOEReplacementOptions();

  const profileStatus = experienceOptions
    .filter((exp) => selectedExperience.includes(exp.value))
    .map((exp) => exp.value);
  const yoeExperience = selectedExperience.filter(
    (exp) => !profileStatus.includes(exp as YOEReplacement),
  ) as Array<ProjectsChallengeSubmissionYOEFilter>;

  const filterSize =
    selectedComponentTrack.length +
    selectedDifficulty.length +
    selectedStatus.length +
    selectedExperience.length;

  const hasClientFilterApplied =
    selectedComponentTrack.length + selectedDifficulty.length > 0;

  const onChangeQuery = (value: string) => {
    setQuery(value);
    updateSearchParams('search', value);
    // Reset page number on URL when query changes
    updateSearchParams('page', '1');
  };

  return {
    filterSize,
    filters,
    hasClientFilterApplied,
    onChangeQuery,
    profileStatus,
    query,
    yoeExperience,
  };
}
