import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import { PrismaClient, QuestionUserInterfaceFramework } from '@prisma/client';

const prisma = new PrismaClient();

export const questionSaveRouter = router({
  userInterfaceAdd: publicProcedure
    .input(
      z.object({
        files: z.string(),
        framework: z.enum([
          // TODO: Read from Prisma directly.
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
          return null;
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
        return null;
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
        return null;
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
        return null;
      }

      return await prisma.questionUserInterfaceSave.findMany({
        orderBy: {
          createdAt: 'desc',
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
        return null;
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
