import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';
import { useState } from 'react';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import {
  useProjectsChallengeSubmissionFilterContext,
  useProjectsChallengeSubmissionFilterState,
} from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import type { ProjectsChallengeSubmissionYOEFilter } from '~/components/projects/submissions/types';
import type { ProjectsYoeReplacement } from '~/components/projects/types';

export default function useProjectsChallengeSubmissionFilters() {
  const { getStringTypeSearchParams, updateSearchParams } =
    useProjectsChallengeSubmissionFilterContext();
  // Filtering.
  const [query, setQuery] = useState(getStringTypeSearchParams('search'));
  const [selectedComponentTrack] =
    useProjectsChallengeSubmissionFilterState('component-track');
  const [selectedDifficulty] =
    useProjectsChallengeSubmissionFilterState('difficulty');
  const [selectedStatus] = useProjectsChallengeSubmissionFilterState('status');
  const [selectedExperience] =
    useProjectsChallengeSubmissionFilterState('experience');
  const [selectedRoadmapSkills] =
    useProjectsChallengeSubmissionFilterState('roadmap-skills');
  const [selectedTechStackSkills] =
    useProjectsChallengeSubmissionFilterState('tech-stack-skills');

  const projectsMatchesTextQuery = (
    _challengeMetadata: ProjectsChallengeMetadata,
    challengeInfo: ProjectsChallengeInfo,
    searchQuery: string | null,
  ) =>
    challengeInfo.title
      .toLowerCase()
      .includes((searchQuery ?? '').toLowerCase()) ||
    challengeInfo.description
      ?.toLowerCase()
      .includes((searchQuery ?? '').toLowerCase());

  const filterByComponentTrack = (
    challengeMetadata: ProjectsChallengeMetadata,
  ) =>
    selectedComponentTrack.length === 0 ||
    selectedComponentTrack.includes(challengeMetadata.track);

  const filterByDifficulty = (challengeMetadata: ProjectsChallengeMetadata) =>
    selectedDifficulty.length === 0 ||
    selectedDifficulty.includes(challengeMetadata.difficulty);

  const filters: ReadonlyArray<
    (
      challengeMetadata: ProjectsChallengeMetadata,
      challengeInfo: ProjectsChallengeInfo,
    ) => boolean
  > = [
    // Query.
    (challengeMetadata, challengeInfo) =>
      projectsMatchesTextQuery(challengeMetadata, challengeInfo, query),
    // Component Track.
    filterByComponentTrack,
    // Difficulty.
    filterByDifficulty,
  ];

  const { yoeReplacementOptions: experienceOptions } =
    useProjectsYOEReplacementOptions();

  const profileStatus = experienceOptions
    .filter((exp) => selectedExperience.includes(exp.value))
    .map((exp) => exp.value);
  const yoeExperience = selectedExperience.filter(
    (exp) => !profileStatus.includes(exp as ProjectsYoeReplacement),
  ) as Array<ProjectsChallengeSubmissionYOEFilter>;

  const filterSize =
    selectedComponentTrack.length +
    selectedDifficulty.length +
    selectedStatus.length +
    selectedExperience.length +
    selectedRoadmapSkills.length +
    selectedTechStackSkills.length;

  const hasClientFilterApplied =
    selectedComponentTrack.length + selectedDifficulty.length > 0;

  const onChangeQuery = (value: string) => {
    setQuery(value);
    updateSearchParams('search', value);
  };

  return {
    filters,
    filterSize,
    hasClientFilterApplied,
    onChangeQuery,
    profileStatus,
    query,
    yoeExperience,
  };
}
