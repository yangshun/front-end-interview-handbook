import { useState } from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import { useProjectsChallengeFilterState } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';

export default function useProjectsChallengesFilters() {
  const { updateSearchParams, getStringTypeSearchParams } =
    useFilterSearchParams();
  // Filtering.
  const [query, setQuery] = useState(getStringTypeSearchParams('search') ?? '');
  const [selectedComponentTrack] =
    useProjectsChallengeFilterState('component-track');
  const [selectedDifficulty] = useProjectsChallengeFilterState('difficulty');
  const [selectedSkills] = useProjectsChallengeFilterState('skills');
  const [selectedStatus] = useProjectsChallengeFilterState('status');

  const projectsMatchesTextQuery = (
    project: ProjectsChallengeItem,
    searchQuery: string,
  ) =>
    project.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.metadata.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

  const filterByComponentTrack = (project: ProjectsChallengeItem) =>
    selectedComponentTrack.length === 0 ||
    selectedComponentTrack.includes(project.track.slug);

  const filterByDifficulty = (project: ProjectsChallengeItem) =>
    selectedDifficulty.length === 0 ||
    selectedDifficulty.includes(project.metadata.difficulty);

  const filterBySkills = (project: ProjectsChallengeItem) =>
    selectedSkills.length === 0 ||
    project.metadata.skills.some((skill) => selectedSkills.includes(skill));

  const filterByStatus = (project: ProjectsChallengeItem) =>
    selectedStatus.length === 0 ||
    selectedStatus.includes(project.status ?? '') ||
    (selectedStatus.includes('NOT_STARTED') &&
      project.status !== 'IN_PROGRESS' &&
      project.status !== 'COMPLETED');

  const filters: ReadonlyArray<
    [number, (project: ProjectsChallengeItem) => boolean]
  > = [
    // Query.
    [0, (project) => projectsMatchesTextQuery(project, query)],
    // Component Track.
    [selectedComponentTrack.length, filterByComponentTrack],
    // Difficulty.
    [selectedDifficulty.length, filterByDifficulty],
    // Skills.
    [selectedSkills.length, filterBySkills],
    // Status.
    [selectedStatus.length, filterByStatus],
  ];

  const onChangeQuery = (value: string) => {
    setQuery(value);
    updateSearchParams('search', value);
  };

  return {
    filters,
    onChangeQuery,
    query,
  };
}
