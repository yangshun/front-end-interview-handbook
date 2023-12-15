import { z } from 'zod';

import { profileNameSchemaServer } from '~/hooks/user/profileName';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

export const profileRouter = router({
  getProfile: publicProcedure.query(async ({ ctx: { user } }) => {
    if (!user) {
      throw 'User account required. Register or sign in first.';
    }

    return await prisma.profile.findUnique({
      where: {
        id: user.id,
      },
    });
  }),
  nameUpdate: publicProcedure
    .input(
      z.object({
        name: profileNameSchemaServer,
      }),
    )
    .mutation(async ({ input: { name }, ctx: { user } }) => {
      if (!user) {
        throw 'User account required. Register or sign in first.';
      }

      return await prisma.profile.update({
        data: {
          name,
        },
        where: {
          id: user.id,
        },
      });
    }),
});
