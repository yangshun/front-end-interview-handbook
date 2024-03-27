import { z } from 'zod';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { publicProcedure, router } from '~/server/trpc';

import { projectsUserProcedure } from './procedures';

import { TRPCError } from '@trpc/server';

export const projectsChallengeRouter = router({
  accessUnlock: projectsUserProcedure
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
    .query(async ({ input: { locale, slug }, ctx: { viewer } }) => {
      const { challenge } = await readProjectsChallengeItem(
        slug,
        locale,
        viewer?.id,
      );

      return {
        ...challenge,
        // Don't display status in hovercard.
        status: null,
      };
    }),
});
