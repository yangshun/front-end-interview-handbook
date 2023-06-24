import { z } from 'zod';

import type { QuestionFormat } from '~/components/questions/common/QuestionsTypes';

import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';
import { hashQuestion } from '~/db/QuestionsUtils';

import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const questionProgressRouter = router({
  add: publicProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string().optional(),
        progressId: z.string().optional(),
        slug: z.string(),
        status: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { format, slug, status, progressId, listKey },
        ctx: { user },
      }) => {
        if (!user) {
          return null;
        }

        const createData = {
          format,
          slug,
          status,
          userId: user.id,
        };
        let questionProgress = null;

        if (!progressId) {
          questionProgress = await prisma.questionProgress.create({
            data: createData,
          });
        } else {
          questionProgress = await prisma.questionProgress.upsert({
            create: createData,
            update: {
              status,
            },
            where: {
              id: progressId,
            },
          });
        }

        if (listKey != null) {
          try {
            const session = await prisma.questionListSession.findFirst({
              where: {
                key: listKey,
                status: 'IN_PROGRESS',
                userId: user.id,
              },
            });

            if (session != null) {
              await prisma.questionListSessionProgress.create({
                data: {
                  key: hashQuestion(format, slug),
                  sessionId: session.id,
                  status: 'COMPLETED',
                },
              });
            }
          } catch {
            // TODO: Report error
          }
        }

        return {
          ...questionProgress,
          format: questionProgress.format as QuestionFormat,
          status: questionProgress.status as QuestionProgressStatus,
        };
      },
    ),
  delete: publicProcedure
    .input(
      z.object({
        format: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug, format }, ctx: { user } }) => {
      if (!user) {
        return;
      }
      await prisma.questionProgress.deleteMany({
        where: {
          format,
          slug,
          userId: user.id,
        },
      });
    }),
  deleteAll: publicProcedure.mutation(async ({ ctx: { user } }) => {
    if (!user) {
      return;
    }
    await prisma.questionProgress.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }),
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
  getAll: publicProcedure.query(async ({ ctx: { user } }) => {
    if (!user) {
      return null;
    }

    const questionProgressList = await prisma.questionProgress.findMany({
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
        userId: user.id,
      },
    });

    return questionProgressList.map((questionProgress) => ({
      ...questionProgress,
      format: questionProgress.format as QuestionFormat,
      status: questionProgress.status as QuestionProgressStatus,
    }));
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
