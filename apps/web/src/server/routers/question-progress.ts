import { z } from 'zod';

import type { QuestionFormat } from '~/components/questions/common/QuestionsTypes';

import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';

import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const questionProgressRouter = router({
  get: publicProcedure
    .input(
      z.object({
        question: z.object({
          format: z.string(),
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ input: { question }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      const questionProgress = await prisma.questionProgress.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          createdAt: true,
          format: true,
          id: true,
          slug: true,
          status: true,
        },
        where: {
          format: question.format,
          slug: question.slug,
          userId: user.id,
        },
      });

      if (!questionProgress) {
        return null;
      }

      return {
        ...questionProgress,
        format: questionProgress.format as QuestionFormat,
        status: questionProgress.status as QuestionProgressStatus,
      };
    }),
  globalCompleted: publicProcedure
    .input(
      z.object({
        format: z.string(),
        slug: z.string(),
      }),
    )
    .query(async ({ input: { format, slug } }) => {
      const completed = await prisma.questionProgress.count({
        where: {
          format,
          slug,
        },
      });

      return completed;
    }),
});
