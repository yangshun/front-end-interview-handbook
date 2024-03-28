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

// TODO(projects): delete this.
export function projectsChallengeDetermineStatus_DEPRECATED(
  challengeStatuses: ProjectsChallengeHistoricalStatuses,
  slug: string,
) {
  if (!challengeStatuses[slug]) {
    return 'NOT_STARTED';
  }

  const { currentStatus } = challengeStatuses[slug];

  switch (currentStatus) {
    case 'COMPLETED':
      return 'COMPLETED';
    case 'IN_PROGRESS':
      return 'IN_PROGRESS';
    case 'STOPPED':
      return 'NOT_STARTED';
  }
}
