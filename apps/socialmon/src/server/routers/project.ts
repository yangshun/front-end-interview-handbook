import { z } from 'zod';

import { projectSchema } from '~/schema';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';

import type { ProjectTransformed } from '~/types';

import { TRPCError } from '@trpc/server';

export const projectRouter = router({
  create: userProcedure
    .input(
      z.object({
        data: projectSchema,
      }),
    )
    .mutation(async ({ input: { data }, ctx: { session } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }
      await prisma.project.create({
        data,
      });
    }),
  delete: userProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { projectId }, ctx: { session } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }
      await prisma.project.delete({
        where: {
          id: projectId,
        },
      });
    }),
  edit: userProcedure
    .input(
      z.object({
        data: projectSchema,
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { projectId, data }, ctx: { session } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }
      await prisma.project.update({
        data,
        where: {
          id: projectId,
        },
      });
    }),
  get: userProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .query(async ({ input: { projectId } }) => {
      return await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });
    }),
  getAll: userProcedure.query(async () => {
    const result = await prisma.project.findMany();

    return result as Array<ProjectTransformed>;
  }),
});
