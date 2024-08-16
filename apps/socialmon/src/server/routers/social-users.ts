import { z } from 'zod';

import { encryptPassword } from '~/db/utils';
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

      const encryptedPassword = encryptPassword(user.password, user.username);

      await prisma.redditUser.create({
        data: {
          password: encryptedPassword,
          username: user.username,
        },
      });
    }),
  deletePlatformUser: userProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      await prisma.redditUser.delete({
        where: {
          id,
        },
      });
    }),
  getPlatformUsers: userProcedure.query(async () => {
    return await prisma.redditUser.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }),
});
