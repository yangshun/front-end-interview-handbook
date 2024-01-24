import { z } from 'zod';

import type { ProjectsChallengeStatuses } from '~/components/projects/challenges/types';

import {
  readProjectsChallengeItem,
  readProjectsTrack,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

import { projectsUserProcedure } from './procedures';

const projectsChallengeProcedure = projectsUserProcedure.input(
  z.object({
    slug: z.string(),
  }),
);

export const projectsChallengesRouter = router({
  getChallenge: projectsChallengeProcedure
    .input(
      z.object({
        locale: z.string(),
        profileId: z.string(),
      }),
    )
    .query(async ({ input: { profileId, slug, locale } }) => {
      const challengeSession = await prisma.projectsChallengeSession.findFirst({
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          profileId,
          slug,
          status: {
            not: 'STOPPED',
          },
        },
      });

      const { challenge } = await readProjectsChallengeItem(slug, locale);

      return {
        ...challenge,
        status: challengeSession?.status || null,
      };
    }),
  progressStatus: publicProcedure
    .input(
      z.object({
        trackSlug: z.string().optional(), // Track slug
        userId: z.string(),
      }),
    )
    .query(async ({ input: { trackSlug, userId } }) => {
      let challengeSlugs = null;

      if (trackSlug) {
        const { track } = await readProjectsTrack(trackSlug);

        challengeSlugs = track.challenges.map((challenge) => challenge.slug);
      }

      const challengeStatuses: ProjectsChallengeStatuses = {};

      const challengeSessionRows =
        await prisma.projectsChallengeSession.findMany({
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
    }),
});
