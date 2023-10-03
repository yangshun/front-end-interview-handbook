import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import {
  PrismaClient,
  QuestionSubmissionResult,
  QuestionUserInterfaceFramework,
  QuestionWorkingLanguage,
} from '@prisma/client';

const prisma = new PrismaClient();

export const questionSubmissionRouter = router({
  javaScriptAdd: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.enum([
          // TODO: Read from Prisma directly.
          QuestionWorkingLanguage.JS,
          QuestionWorkingLanguage.TS,
        ]),
        result: z.enum([
          QuestionSubmissionResult.CORRECT,
          QuestionSubmissionResult.WRONG,
        ]),
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ input: { code, slug, language, result }, ctx: { user } }) => {
        if (!user) {
          return null;
        }

        return await prisma.questionJavaScriptSubmission.create({
          data: {
            code,
            language,
            result,
            slug,
            userId: user.id,
          },
        });
      },
    ),
  javaScriptGet: publicProcedure
    .input(
      z.object({
        submissionId: z.string(),
      }),
    )
    .query(async ({ input: { submissionId }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      return await prisma.questionJavaScriptSubmission.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: submissionId,
          userId: user.id,
        },
      });
    }),
  javaScriptGetAll: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      return await prisma.questionJavaScriptSubmission.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
          userId: user.id,
        },
      });
    }),
  userInterfaceAdd: publicProcedure
    .input(
      z.object({
        code: z.string(),
        framework: z.enum([
          // TODO: Read from Prisma directly.
          QuestionUserInterfaceFramework.REACT,
          QuestionUserInterfaceFramework.VANILLA,
          QuestionUserInterfaceFramework.ANGULAR,
          QuestionUserInterfaceFramework.VUE,
          QuestionUserInterfaceFramework.SVELTE,
        ]),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { code, slug, framework }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      return await prisma.questionUserInterfaceSubmission.create({
        data: {
          code,
          framework,
          slug,
          userId: user.id,
        },
      });
    }),
  userInterfaceGet: publicProcedure
    .input(
      z.object({
        submissionId: z.string(),
      }),
    )
    .query(async ({ input: { submissionId }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      return await prisma.questionUserInterfaceSubmission.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: submissionId,
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

      return await prisma.questionUserInterfaceSubmission.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
          userId: user.id,
        },
      });
    }),
});
