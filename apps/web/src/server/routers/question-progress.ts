import { z } from 'zod';

import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';
import { hashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

export const questionProgressRouter = router({
  add: userProcedure
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
            const session = await prisma.learningSession.findFirst({
              where: {
                key: listKey,
                status: 'IN_PROGRESS',
                userId: user.id,
              },
            });

            if (session != null) {
              await prisma.learningSessionProgress.create({
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
  delete: userProcedure
    .input(
      z.object({
        format: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug, format }, ctx: { user } }) => {
      await prisma.questionProgress.deleteMany({
        where: {
          format,
          slug,
          userId: user.id,
        },
      });
    }),
  deleteAll: userProcedure.mutation(async ({ ctx: { user } }) => {
    await prisma.questionProgress.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }),
  get: userProcedure
    .input(
      z.object({
        question: z.object({
          format: z.string(),
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ input: { question }, ctx: { user } }) => {
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
  getAll: userProcedure.query(async ({ ctx: { user } }) => {
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
