import { z } from 'zod';

import type { ProjectsChallengeStatuses } from '~/components/projects/challenges/types';

import {
  readProjectsChallengeItem,
  readProjectsTrack,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

export const projectsChallengesRouter = router({
  hovercard: publicProcedure
    .input(
      z.object({
        locale: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ input: { locale, slug }, ctx: { user } }) => {
      const [{ challenge }, challengeSession] = await Promise.all([
        readProjectsChallengeItem(slug, locale),
        user?.id == null
          ? null
          : prisma.projectsChallengeSession.findFirst({
              orderBy: {
                createdAt: 'asc',
              },
              where: {
                projectsProfile: {
                  userId: user?.id,
                },
                slug,
                status: {
                  not: 'STOPPED',
                },
              },
            }),
      ]);

      return {
        ...challenge,
        status: challengeSession?.status || null,
      };
    }),
  progress: publicProcedure
    .input(
      z.object({
        trackSlug: z.string().optional(),
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
