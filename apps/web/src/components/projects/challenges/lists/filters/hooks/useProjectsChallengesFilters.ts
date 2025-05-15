import { useState } from 'react';

import { useProjectsChallengeFilterState } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import { useProjectsChallengeFilterContext } from '~/components/projects/challenges/lists/ProjectsChallengeFilterContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';

export default function useProjectsChallengesFilters() {
  const { getStringTypeSearchParams, updateSearchParams } =
    useProjectsChallengeFilterContext();
  // Filtering.
  const [query, setQuery] = useState(getStringTypeSearchParams('search') ?? '');
  const [selectedComponentTrack] =
    useProjectsChallengeFilterState('component-track');
  const [selectedDifficulty] = useProjectsChallengeFilterState('difficulty');
  const [selectedSkills] = useProjectsChallengeFilterState('skills');
  const [selectedStatus] = useProjectsChallengeFilterState('status');

  const projectsMatchesTextQuery = (
    challenge: ProjectsChallengeItem,
    searchQuery: string,
  ) =>
    challenge.info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.info.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

  const filterByComponentTrack = (challenge: ProjectsChallengeItem) =>
    selectedComponentTrack.length === 0 ||
    selectedComponentTrack.includes(challenge.track.slug);

  const filterByDifficulty = (challenge: ProjectsChallengeItem) =>
    selectedDifficulty.length === 0 ||
    selectedDifficulty.includes(challenge.metadata.difficulty);

  const filterBySkills = (challenge: ProjectsChallengeItem) =>
    selectedSkills.length === 0 ||
    challenge.metadata.skills.some((skill) => selectedSkills.includes(skill));

  const filterByStatus = (challenge: ProjectsChallengeItem) =>
    selectedStatus.length === 0 ||
    selectedStatus.includes(challenge.status ?? '') ||
    (selectedStatus.includes('NOT_STARTED') &&
      challenge.status !== 'IN_PROGRESS' &&
      challenge.status !== 'COMPLETED');

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
