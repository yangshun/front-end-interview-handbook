import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { encryptPassword } from '~/db/utils';
import { userSchema } from '~/schema';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';

export const socialUsersRouter = router({
  addPlatformUser: userProcedure
    .input(
      z.object({
        projectSlug: z.string(),
        user: userSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { user, projectSlug } = input;
      const project = await prisma.project.findUnique({
        select: { id: true },
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project not found!',
        });
      }

      const encryptedPassword = encryptPassword(user.password, user.username);

      await prisma.redditUser.create({
        data: {
          password: encryptedPassword,
          projectId: project.id,
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
  getPlatformUsers: userProcedure
    .input(
      z.object({
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input: { projectSlug } }) => {
      const project = await prisma.project.findUnique({
        select: { id: true },
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        return [];
      }

      return await prisma.redditUser.findMany({
        select: {
          id: true,
          username: true,
        },
        where: {
          projectId: project.id,
        },
      });
    }),
});
