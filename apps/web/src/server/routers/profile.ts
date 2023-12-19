import { z } from 'zod';

import { profileNameSchemaServer } from '~/hooks/user/profileName';
import { profileUserNameSchemaServer } from '~/hooks/user/profileUserName';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export const profileRouter = router({
  getProfile: userProcedure.query(async ({ ctx: { user } }) => {
    return await prisma.profile.findUnique({
      where: {
        id: user.id,
      },
    });
  }),
  nameUpdate: userProcedure
    .input(
      z.object({
        name: profileNameSchemaServer,
      }),
    )
    .mutation(async ({ input: { name }, ctx: { user } }) => {
      return await prisma.profile.update({
        data: {
          name,
        },
        where: {
          id: user.id,
        },
      });
    }),
  userNameUpdate: userProcedure
    .input(
      z.object({
        username: profileUserNameSchemaServer,
      }),
    )
    .mutation(async ({ input: { username }, ctx: { user } }) => {
      try {
        return await prisma.profile.update({
          data: {
            username,
          },
          where: {
            id: user.id,
          },
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Username already exists.',
            });
          }

          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An error occurred.',
          });
        }
      }
    }),
});
