import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { useState } from 'react';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import type { YOEReplacement } from '~/components/projects/types';

import { useProjectsChallengeSubmissionFilterState } from '../../ProjectsChallengeSubmissionFilterContext';

export default function useProjectsChallengeSubmissionFilters() {
  // Filtering.
  const [query, setQuery] = useState('');
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
  );

  const filterSize =
    selectedComponentTrack.length +
    selectedDifficulty.length +
    selectedStatus.length +
    selectedExperience.length;

  return {
    filterSize,
    filters,
    profileStatus,
    query,
    setQuery,
    yoeExperience,
  };
}
