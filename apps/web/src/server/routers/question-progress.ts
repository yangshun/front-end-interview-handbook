import { z } from 'zod';

import { groupByDateFormatter } from '~/components/interviews/dashboard/progress/utils';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';
import { hashQuestion, unhashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { TRPCClientError } from '@trpc/client';

export const questionProgressRouter = router({
  add: userProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string().optional(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { format, slug, listKey }, ctx: { viewer } }) => {
      if (!viewer) {
        return null;
      }

      try {
        const questionProgress = await prisma.questionProgress.create({
          data: {
            format,
            slug,
            status: 'complete',
            userId: viewer.id,
          },
        });

        if (listKey == null) {
          return questionProgress;
        }
      } catch (_err) {
        // Do nothing because it's a unique index.
      }

      const session = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        throw 'No ongoing learning session. Start tracking progress first.';
      }

      return await prisma.learningSessionProgress.create({
        data: {
          key: hashQuestion({ format: format as QuestionFormat, slug }),
          sessionId: session.id,
          status: 'COMPLETED',
        },
      });
    }),
  delete: userProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string().optional(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug, format, listKey }, ctx: { viewer } }) => {
      // Remove EITHER overall progress or learning session progress but not both.
      if (listKey) {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        if (session == null) {
          throw 'No ongoing learning session. Start tracking progress first.';
        }

        return await prisma.learningSessionProgress.deleteMany({
          where: {
            key: hashQuestion({ format: format as QuestionFormat, slug }),
            sessionId: session.id,
          },
        });
      }

      return await prisma.questionProgress.deleteMany({
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
        listKey: z.string().optional(),
        question: z.object({
          format: z.string(),
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ input: { question, listKey }, ctx: { viewer } }) => {
      if (listKey) {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        if (session == null) {
          return null;
        }

        const [listQuestionProgress, questionProgress] = await Promise.all([
          prisma.learningSessionProgress.findFirst({
            where: {
              key: hashQuestion({
                format: question.format as QuestionFormat,
                slug: question.slug,
              }),
              sessionId: session.id,
            },
          }),
          prisma.questionProgress.findFirst({
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
          }),
        ]);

        if (!listQuestionProgress) {
          return null;
        }

        const [format, slug] = unhashQuestion(listQuestionProgress.key);
        const completeStatus: QuestionProgressStatus = 'complete';

        return {
          ...listQuestionProgress,
          format,
          questionProgressId: questionProgress?.id,
          slug,
          status: completeStatus,
        };
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
      const [questionProgress, learningSessionProgress, guideProgress] =
        await Promise.all([
          prisma.questionProgress.groupBy({
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
          }),
          prisma.learningSessionProgress.groupBy({
            _count: {
              id: true,
            },
            by: ['createdAt'],
            where: {
              createdAt: {
                gte: startTime,
                lte: endTime,
              },
              session: {
                userId: viewer.id,
              },
            },
          }),
          prisma.guideProgress.groupBy({
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
          }),
        ]);

      const formattedResults: Record<string, number> = {};
      const addCounts = (
        progressData: Array<{ _count: { id: number }; createdAt: Date }>,
      ) => {
        progressData.forEach(({ createdAt, _count }) => {
          const dateStr = groupByDateFormatter.format(new Date(createdAt));

          formattedResults[dateStr] =
            (formattedResults[dateStr] ?? 0) + _count.id;
        });
      };

      // Aggregate each progress array
      addCounts(questionProgress);
      addCounts(learningSessionProgress);
      addCounts(guideProgress);

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
            key: hashQuestion({ format: format as QuestionFormat, slug }),
            sessionId: session.id,
            status: 'COMPLETED',
          }) as const,
      );

      await prisma.learningSessionProgress.createMany({
        data,
      });
    }),
});
