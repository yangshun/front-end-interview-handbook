import type {
  ProjectsChallengeHistoricalStatuses,
  ProjectsChallengeItem,
} from '../types';

export function projectsChallengeCountCompletedIncludingHistorical(
  challengeStatuses: ProjectsChallengeHistoricalStatuses,
  challenges: ReadonlyArray<ProjectsChallengeItem>,
): number {
  const slugs = challenges.map(({ metadata }) => metadata.slug);

  return Object.entries(challengeStatuses).filter(
    ([challengeSlug, { completedBefore }]) => {
      if (!slugs.includes(challengeSlug)) {
        return false;
      }

      return completedBefore;
    },
  ).length;
}
