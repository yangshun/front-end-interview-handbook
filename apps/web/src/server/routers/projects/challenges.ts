import { z } from 'zod';

import type { ProjectsChallengeStatuses } from '~/components/projects/challenges/types';

import {
  readProjectsChallengesForSkill,
  readProjectsTrack,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

export const projectsChallengesRouter = router({
  listForSkills: publicProcedure
    .input(
      z.object({
        locale: z.string().optional(),
        skillSlug: z.string(),
      }),
    )
    .query(async ({ input: { skillSlug, locale }, ctx: { user } }) => {
      return readProjectsChallengesForSkill(skillSlug, locale, user?.id);
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
