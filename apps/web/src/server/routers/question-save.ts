import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

import { QuestionUserInterfaceFramework } from '@prisma/client';

export const questionSaveRouter = router({
  userInterfaceAdd: userProcedure
    .input(
      z.object({
        files: z.string(),
        framework: z.nativeEnum(QuestionUserInterfaceFramework),
        name: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ input: { files, name, slug, framework }, ctx: { viewer } }) => {
        return await prisma.questionUserInterfaceSave.create({
          data: {
            files,
            framework,
            name,
            slug,
            userId: viewer.id,
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
    .mutation(async ({ input: { saveId }, ctx: { viewer } }) => {
      return await prisma.questionUserInterfaceSave.delete({
        where: {
          id: saveId,
          userId: viewer.id,
        },
      });
    }),
  userInterfaceGet: userProcedure
    .input(
      z.object({
        saveId: z.string(),
      }),
    )
    .query(async ({ input: { saveId }, ctx: { viewer } }) => {
      return await prisma.questionUserInterfaceSave.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: saveId,
          userId: viewer.id,
        },
      });
    }),
  userInterfaceGetAll: userProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { viewer } }) => {
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
          userId: viewer.id,
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
    .mutation(async ({ input: { files, name, saveId }, ctx: { viewer } }) => {
      return await prisma.questionUserInterfaceSave.update({
        data: {
          files,
          name,
        },
        where: {
          id: saveId,
          userId: viewer.id,
        },
      });
    }),
});
