import { z } from 'zod';

import { groupByDateFormatter } from '~/components/interviews/dashboard/progress-glance/utils';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';
import { hashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { TRPCClientError } from '@trpc/client';

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
        ctx: { viewer },
      }) => {
        if (!viewer) {
          return null;
        }

        const createData = {
          format,
          slug,
          status,
          userId: viewer.id,
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
                userId: viewer.id,
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
    .mutation(async ({ input: { slug, format }, ctx: { viewer } }) => {
      await prisma.questionProgress.deleteMany({
        where: {
          format,
          slug,
          userId: viewer.id,
        },
      });
    }),
  deleteAll: userProcedure.mutation(async ({ ctx: { viewer } }) => {
    await prisma.questionProgress.deleteMany({
      where: {
        userId: viewer.id,
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
    .query(async ({ input: { question }, ctx: { viewer } }) => {
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
          userId: viewer.id,
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
  getAll: userProcedure.query(async ({ ctx: { viewer } }) => {
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
        userId: viewer.id,
      },
    });

    return questionProgressList.map((questionProgress) => ({
      ...questionProgress,
      format: questionProgress.format as QuestionFormat,
      status: questionProgress.status as QuestionProgressStatus,
    }));
  }),
  getContributionsCount: userProcedure
    .input(
      z.object({
        endTime: z.date(),
        startTime: z.date(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { startTime, endTime } }) => {
      const progress = await prisma.questionProgress.groupBy({
        _count: {
          id: true,
        },
        by: ['createdAt'],
        where: {
          createdAt: {
            gte: startTime,
            lte: endTime,
          },
          userId: viewer.id,
        },
      });
      // Formatting the result
      const formattedResults: Record<string, number> = {};

      progress.forEach(({ createdAt, _count }) => {
        const dateStr = groupByDateFormatter.format(new Date(createdAt));

        formattedResults[dateStr] = _count.id;
      });

      return formattedResults;
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
  importProgress: userProcedure
    .input(
      z.object({
        listKey: z.string(),
        questions: z.array(
          z.object({
            format: z.string(),
            slug: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input: { questions, listKey }, ctx: { viewer } }) => {
      if (!viewer) {
        return null;
      }

      const session = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        throw new TRPCClientError('No session found!');
      }

      const data = questions.map(
        ({ format, slug }) =>
          ({
            key: hashQuestion(format, slug),
            sessionId: session.id,
            status: 'COMPLETED',
          }) as const,
      );

      await prisma.learningSessionProgress.createMany({
        data,
      });
    }),
});
