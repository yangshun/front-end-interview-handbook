import {
  QuestionUserInterfaceFramework,
  QuestionWorkingLanguage,
} from '@prisma/client';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

export const questionCommunitySolutionRouter = router({
  javaScriptAdd: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.nativeEnum(QuestionWorkingLanguage),
        slug: z.string(),
        title: z.string(),
        writeup: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: { viewer },
        input: { code, language, slug, title, writeup },
      }) => {
        if (!viewer) {
          return null;
        }

        return await prisma.questionJavaScriptCommunitySolution.create({
          data: {
            code,
            language,
            slug,
            title,
            userId: viewer.id,
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
  userInterfaceAdd: userProcedure
    .input(
      z.object({
        files: z.string(),
        framework: z.nativeEnum(QuestionUserInterfaceFramework),
        slug: z.string(),
        title: z.string(),
        writeup: z.string(),
      }),
    )
    .mutation(
      async ({
        ctx: { viewer },
        input: { files, framework, slug, title, writeup },
      }) => {
        return await prisma.questionUserInterfaceCommunitySolution.create({
          data: {
            files,
            framework,
            slug,
            title,
            userId: viewer.id,
            writeup,
          },
        });
      },
    ),
  userInterfaceGetAll: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ input: { slug } }) => {
      return await prisma.questionUserInterfaceCommunitySolution.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          slug,
        },
      });
    }),
});
