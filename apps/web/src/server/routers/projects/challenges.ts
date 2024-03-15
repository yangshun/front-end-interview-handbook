import { z } from 'zod';

import type { ProjectsChallengeStatuses } from '~/components/projects/challenges/types';

import {
  readProjectsChallengeItem,
  readProjectsTrack,
} from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

import { projectsUserProcedure } from './procedures';

import { TRPCError } from '@trpc/server';

export const projectsChallengesRouter = router({
  canAccessAllSteps: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      const sessions = await prisma.projectsChallengeSession.count({
        where: {
          profileId: projectsProfileId,
          slug,
          status: {
            in: ['IN_PROGRESS', 'COMPLETED'],
          },
        },
      });

      return sessions > 0;
    }),
  hovercard: publicProcedure
    .input(
      z.object({
        locale: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ input: { locale, slug }, ctx: { user } }) => {
      const { challenge } = await readProjectsChallengeItem(
        slug,
        locale,
        user?.id,
      );

      return {
        ...challenge,
        // Don't display status in hovercard.
        status: null,
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
  unlockAccess: projectsUserProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug }, ctx: { projectsProfileId } }) => {
      const projectsProfile = await prisma.projectsProfile.findFirstOrThrow({
        select: {
          credits: true,
          premium: true,
        },
        where: {
          id: projectsProfileId,
        },
      });

      if (!projectsProfile.premium || projectsProfile.credits <= 0) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Non-premium or no credits remaining',
        });
      }

      return prisma.projectsChallengeCreditTransaction.create({
        data: {
          access: {
            create: {
              profileId: projectsProfileId,
              slug,
            },
          },
          amount: 1,
          profileId: projectsProfileId,
          type: 'DEBIT' as const,
        },
      });
    }),
});
