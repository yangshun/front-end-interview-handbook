import { z } from 'zod';

import { profileNameSchemaServer } from '~/components/profile/fields/ProfileNameSchema';
import { profileUserNameSchemaServer } from '~/components/profile/fields/ProfileUsernameSchema';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const profileRouter = router({
  // Intentionally make it publicProcedure since many parts of the code
  // call this API. We just return `null` if not logged in.
  getProfile: publicProcedure.query(async ({ ctx: { viewer } }) => {
    if (viewer == null) {
      return null;
    }

    return await prisma.profile.findUnique({
      where: {
        id: viewer.id,
      },
    });
  }),
  nameUpdate: userProcedure
    .input(
      z.object({
        name: profileNameSchemaServer,
      }),
    )
    .mutation(async ({ input: { name }, ctx: { viewer } }) => {
      return await prisma.profile.update({
        data: {
          name,
        },
        where: {
          id: viewer.id,
        },
      });
    }),
  userNameUpdate: userProcedure
    .input(
      z.object({
        username: profileUserNameSchemaServer,
      }),
    )
    .mutation(async ({ input: { username }, ctx: { viewer } }) => {
      try {
        return await prisma.profile.update({
          data: {
            username,
          },
          where: {
            id: viewer.id,
          },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Username already exists.',
          });
        }

        throw error;
      }
    }),
});
