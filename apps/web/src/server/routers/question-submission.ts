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
        language: z.nativeEnum(QuestionWorkingLanguage),
        result: z.nativeEnum(QuestionSubmissionResult),
        slug: z.string(),
      }),
    )
    .mutation(
      async ({ input: { code, slug, language, result }, ctx: { viewer } }) => {
        return await prisma.questionJavaScriptSubmission.create({
          data: {
            code,
            language,
            result,
            slug,
            userId: viewer.id,
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
    .query(async ({ input: { submissionId }, ctx: { viewer } }) => {
      return await prisma.questionJavaScriptSubmission.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: submissionId,
          userId: viewer.id,
        },
      });
    }),
  javaScriptGetAll: userProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug }, ctx: { viewer } }) => {
      return await prisma.questionJavaScriptSubmission.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
          userId: viewer.id,
        },
      });
    }),
});
