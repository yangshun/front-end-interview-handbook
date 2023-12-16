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
});
