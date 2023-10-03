import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import {
  PrismaClient,
  QuestionJavaScriptSubmissionResult,
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
          QuestionJavaScriptSubmissionResult.CORRECT,
          QuestionJavaScriptSubmissionResult.WRONG,
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
});
