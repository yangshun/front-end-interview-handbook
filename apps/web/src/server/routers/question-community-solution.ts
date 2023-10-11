import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

import { QuestionWorkingLanguage } from '@prisma/client';

export const questionCommunitySolutionRouter = router({
  javaScriptAdd: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.enum([
          // TODO(prisma): Read from Prisma directly.
          QuestionWorkingLanguage.JS,
          QuestionWorkingLanguage.TS,
        ]),
        slug: z.string(),
        title: z.string(),
        writeup: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { code, language, slug, title, writeup },
        ctx: { user },
      }) => {
        if (!user) {
          return null;
        }

        return await prisma.questionJavaScriptCommunitySolution.create({
          data: {
            code,
            language,
            slug,
            title,
            userId: user.id,
            writeup,
          },
        });
      },
    ),
  javaScriptGet: publicProcedure
    .input(
      z.object({
        solutionId: z.string(),
      }),
    )
    .query(async ({ input: { solutionId } }) => {
      return await prisma.questionJavaScriptCommunitySolution.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          id: solutionId,
        },
      });
    }),
  javaScriptGetAll: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug } }) => {
      return await prisma.questionJavaScriptCommunitySolution.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
        },
      });
    }),
});
