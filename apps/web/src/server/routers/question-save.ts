import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

import { QuestionUserInterfaceFramework } from '@prisma/client';

export const questionSaveRouter = router({
  userInterfaceAdd: publicProcedure
    .input(
      z.object({
        files: z.string(),
        framework: z.enum([
          // TODO(prisma): Read from Prisma directly.
          QuestionUserInterfaceFramework.REACT,
          QuestionUserInterfaceFramework.VANILLA,
          QuestionUserInterfaceFramework.ANGULAR,
          QuestionUserInterfaceFramework.VUE,
          QuestionUserInterfaceFramework.SVELTE,
        ]),
        name: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ input: { files, name, slug, framework }, ctx: { user } }) => {
        if (!user) {
          throw 'User account required. Register or sign in first.';
        }

        return await prisma.questionUserInterfaceSave.create({
          data: {
            files,
            framework,
            name,
            slug,
            userId: user.id,
          },
        });
      },
    ),
  userInterfaceDelete: publicProcedure
    .input(
      z.object({
        saveId: z.string(),
      }),
    )
    .mutation(async ({ input: { saveId }, ctx: { user } }) => {
      if (!user) {
        throw 'User account required. Register or sign in first.';
      }

      // TODO(acl): prevent unauthorized deletions.
      return await prisma.questionUserInterfaceSave.delete({
        where: {
          id: saveId,
        },
      });
    }),
  userInterfaceGet: publicProcedure
    .input(
      z.object({
        saveId: z.string(),
      }),
    )
    .query(async ({ input: { saveId }, ctx: { user } }) => {
      if (!user) {
        throw 'User account required. Register or sign in first.';
      }

      // TODO(acl): prevent unauthorized reads.
      return await prisma.questionUserInterfaceSave.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: saveId,
          userId: user.id,
        },
      });
    }),
  userInterfaceGetAll: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { user } }) => {
      if (!user) {
        throw 'User account required. Register or sign in first.';
      }

      return await prisma.questionUserInterfaceSave.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          framework: true,
          id: true,
          name: true,
          updatedAt: true,
        },
        where: {
          slug,
          userId: user.id,
        },
      });
    }),
  userInterfaceUpdate: publicProcedure
    .input(
      z.object({
        files: z.string().optional(),
        name: z.string().optional(),
        saveId: z.string(),
      }),
    )
    .mutation(async ({ input: { files, name, saveId }, ctx: { user } }) => {
      if (!user) {
        throw 'User account required. Register or sign in first.';
      }

      // TODO(acl): prevent unauthorized updates.
      return await prisma.questionUserInterfaceSave.update({
        data: {
          files,
          name,
        },
        where: {
          id: saveId,
        },
      });
    }),
});
