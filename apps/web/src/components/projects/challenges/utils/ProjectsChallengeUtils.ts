import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsChallengeStatuses } from '../types';

export function projectsChallengeCountCompleted(
  challengeStatuses: ProjectsChallengeStatuses,
  challenges: ReadonlyArray<ProjectsChallengeMetadata>,
): number {
  const slugs = challenges.map(({ slug }) => slug);

  return Object.entries(challengeStatuses).filter(
    ([challengeSlug, { completedBefore }]) => {
      if (!slugs.includes(challengeSlug)) {
        return false;
      }

      return completedBefore;
    },
  ).length;
}

export function projectsChallengeDetermineStatus(
  challengeStatuses: ProjectsChallengeStatuses,
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
