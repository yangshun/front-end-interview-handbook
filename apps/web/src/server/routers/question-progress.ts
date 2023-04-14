import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const questionProgressRouter = router({
  globalCompleted: publicProcedure
    .input(
      z.object({
        format: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ input: { format, slug } }) => {
      const completed = await prisma.questionProgress.count({
        where: {
          format,
          slug,
        },
      });

      return completed;
    }),
});
