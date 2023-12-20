import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../../trpc';

export const profileRouter = router({
  motivationsUpdate: userProcedure
    .input(
      z.object({
        primaryMotivation: z.string(),
        secondaryMotivation: z.string().nullable(),
      }),
    )
    .mutation(
      async ({
        input: { primaryMotivation, secondaryMotivation },
        ctx: { user },
      }) => {
        return await prisma.projectsProfile.upsert({
          create: {
            primaryMotivation,
            secondaryMotivation,
            userId: user.id,
          },
          update: {
            primaryMotivation,
            secondaryMotivation,
          },
          where: {
            userId: user.id,
          },
        });
      },
    ),
  onboardingStep1Get: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        currentStatus: true,
        name: true,
        startWorkDate: true,
        title: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep1Update: userProcedure
    .input(
      z.object({
        currentStatus: z.string().optional(),
        name: z.string(),
        startWorkDate: z.date().optional(),
        title: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { currentStatus, name, title, startWorkDate },
        ctx: { user },
      }) => {
        return await prisma.profile.update({
          data: {
            currentStatus,
            name,
            startWorkDate,
            title,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
  onboardingStep2Get: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      select: {
        bio: true,
        githubUsername: true,
        linkedInUsername: true,
        website: true,
      },
      where: {
        id: user.id,
      },
    });
  }),
  onboardingStep2Update: userProcedure
    .input(
      z.object({
        bio: z.string(),
        githubUsername: z.string().optional(),
        linkedInUsername: z.string().optional(),
        website: z.string().optional(),
      }),
    )
    .mutation(
      async ({
        input: { bio, githubUsername, linkedInUsername, website },
        ctx: { user },
      }) => {
        return await prisma.profile.update({
          data: {
            bio,
            githubUsername,
            linkedInUsername,
            website,
          },
          where: {
            id: user.id,
          },
        });
      },
    ),
});
