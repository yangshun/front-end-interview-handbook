import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

import {
  QuestionSubmissionResult,
  QuestionWorkingLanguage,
} from '@prisma/client';

export const questionSubmissionRouter = router({
  javaScriptAdd: userProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.enum([
          // TODO(prisma): Read from Prisma directly.
          QuestionWorkingLanguage.JS,
          QuestionWorkingLanguage.TS,
        ]),
        result: z.enum([
          // TODO(prisma): Read from Prisma directly.
          QuestionSubmissionResult.CORRECT,
          QuestionSubmissionResult.WRONG,
        ]),
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ input: { code, slug, language, result }, ctx: { user } }) => {
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
  javaScriptGet: userProcedure
    .input(
      z.object({
        submissionId: z.string(),
      }),
    )
    .query(async ({ input: { submissionId }, ctx: { user } }) => {
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
  javaScriptGetAll: userProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { user } }) => {
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
