import { readProjectsTrack } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';

export async function projectsTrackChallengeHistoricalStatuses(
  userId?: string,
  trackSlug?: string,
): Promise<ProjectsChallengeHistoricalStatuses> {
  if (userId == null) {
    return {};
  }

  let challengeSlugs = null;

  if (trackSlug) {
    const { track } = await readProjectsTrack(trackSlug);

    challengeSlugs = track.challenges.map(
      (challenge) => challenge.metadata.slug,
    );
  }

  const challengeStatuses: ProjectsChallengeHistoricalStatuses = {};

  const challengeSessionRows = await prisma.projectsChallengeSession.findMany({
    orderBy: {
      updatedAt: 'asc',
    },
    select: {
      slug: true,
      status: true,
      updatedAt: true,
    },
    where:
      challengeSlugs != null
        ? {
            projectsProfile: {
              userId,
            },
            slug: {
              in: challengeSlugs,
            },
          }
        : {
            projectsProfile: {
              userId,
            },
          },
  });

  challengeSessionRows.forEach(({ slug, status }) => {
    if (!challengeStatuses[slug]) {
      challengeStatuses[slug] = {
        completedBefore: false,
        currentStatus: status,
      };
    }

    challengeStatuses[slug].currentStatus = status;
    if (status === 'COMPLETED') {
      challengeStatuses[slug].completedBefore = true;
    }
  });

  return challengeStatuses;
}
