import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

import { QuestionUserInterfaceFramework } from '@prisma/client';

export const questionSaveRouter = router({
  userInterfaceAdd: userProcedure
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
  userInterfaceDelete: userProcedure
    .input(
      z.object({
        saveId: z.string(),
      }),
    )
    .mutation(async ({ input: { saveId }, ctx: { user } }) => {
      return await prisma.questionUserInterfaceSave.delete({
        where: {
          id: saveId,
          userId: user.id,
        },
      });
    }),
  userInterfaceGet: userProcedure
    .input(
      z.object({
        saveId: z.string(),
      }),
    )
    .query(async ({ input: { saveId }, ctx: { user } }) => {
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
  userInterfaceGetAll: userProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { user } }) => {
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
  userInterfaceUpdate: userProcedure
    .input(
      z.object({
        files: z.string().optional(),
        name: z.string().optional(),
        saveId: z.string(),
      }),
    )
    .mutation(async ({ input: { files, name, saveId }, ctx: { user } }) => {
      return await prisma.questionUserInterfaceSave.update({
        data: {
          files,
          name,
        },
        where: {
          id: saveId,
          userId: user.id,
        },
      });
    }),
});
