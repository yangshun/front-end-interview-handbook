import { z } from 'zod';

import { userSchema } from '~/schema';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';

export const socialUsersRouter = router({
  addPlatformUser: userProcedure
    .input(
      z.object({
        user: userSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { user } = input;

      await prisma.redditUser.create({
        data: {
          password: user.password,
          username: user.username,
        },
      });
    }),
  deletePlatformUser: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ input: { username } }) => {
      await prisma.redditUser.delete({
        where: {
          username,
        },
      });
    }),
  getPlatformUsers: userProcedure.query(async () => {
    return await prisma.redditUser.findMany({
      select: {
        username: true,
      },
    });
  }),
});
