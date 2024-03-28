import { z } from 'zod';

import type { ProjectsChallengeStatuses } from '~/components/projects/challenges/types';

import {
  readProjectsChallengesForSkill,
  readProjectsTrack,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

export const projectsChallengesRouter = router({
  countUniqueUsingSkill: publicProcedure
    .input(
      z.object({
        skill: z.string(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { skill } }) => {
      const distinctSlugs = await prisma.projectsChallengeSubmission.findMany({
        distinct: ['slug'],
        where: {
          projectsProfile: {
            userId: viewer?.id,
          },
          roadmapSkills: {
            has: skill,
          },
        },
      });

      return distinctSlugs.length;
    }),
  historicalProgress: publicProcedure
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

        challengeSlugs = track.challenges.map(
          (challenge) => challenge.metadata.slug,
        );
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
  listForSkills: publicProcedure
    .input(
      z.object({
        locale: z.string().optional(),
        skillSlug: z.string(),
      }),
    )
    .query(async ({ input: { skillSlug, locale }, ctx: { viewer } }) => {
      return readProjectsChallengesForSkill(skillSlug, locale, viewer?.id);
    }),
  skillPlanProgress: publicProcedure
    .input(
      z.object({
        skillSlug: z.string(),
        userId: z.string(),
      }),
    )
    .query(async ({ input: { skillSlug, userId } }) => {
      const challengeStatuses: ProjectsChallengeStatuses = {};

      const [challengeSessionRows, submissions] = await Promise.all([
        prisma.projectsChallengeSession.findMany({
          orderBy: {
            updatedAt: 'asc',
          },
          select: {
            slug: true,
            status: true,
            updatedAt: true,
          },
          where: {
            projectsProfile: {
              userId,
            },
            roadmapSkills: {
              has: skillSlug,
            },
          },
        }),
        prisma.projectsChallengeSubmission.findMany({
          distinct: ['slug'],
          where: {
            projectsProfile: {
              userId,
            },
            roadmapSkills: {
              has: skillSlug,
            },
          },
        }),
      ]);

      submissions.forEach((submission) => {
        challengeStatuses[submission.slug] = {
          completedBefore: true,
          currentStatus: 'COMPLETED',
        };
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
