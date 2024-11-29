import { z } from 'zod';

import { groupByDateFormatter } from '~/components/interviews/dashboard/progress/utils';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
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
        slug: z.string(),
        studyListKey: z.string().optional(),
      }),
    )
    .mutation(
      async ({ input: { format, slug, studyListKey }, ctx: { viewer } }) => {
        if (!viewer) {
          return null;
        }

        const questionProgress = await prisma.questionProgress.upsert({
          create: {
            format,
            slug,
            status: 'complete',
            userId: viewer.id,
          },
          update: {},
          where: {
            format_slug_status_userId: {
              format,
              slug,
              status: 'complete',
              userId: viewer.id,
            },
          },
        });

        if (studyListKey == null) {
          return { newSessionCreated: false, questionProgress };
        }

        const [{ newSessionCreated, session }, studyList] = await Promise.all([
          (async () => {
            // We don't check if the user is premium and can
            // start a premium list, it's probably fine.
            const session_ = await prisma.learningSession.findFirst({
              where: {
                key: studyListKey,
                status: 'IN_PROGRESS',
                userId: viewer.id,
              },
            });

            if (session_ != null) {
              // Update the learning session updatedAt to sort by updatedAt in questionSessions.getActive query
              await prisma.learningSession.update({
                data: {
                  updatedAt: new Date(),
                },
                where: {
                  id: session_.id,
                },
              });

              return { newSessionCreated: false, session: session_ };
            }

            // Create a session.
            const session__ = await prisma.learningSession.create({
              data: {
                key: studyListKey,
                userId: viewer.id,
              },
            });

            return { newSessionCreated: true, session: session__ };
          })(),
          fetchInterviewsStudyList(studyListKey),
        ]);

        const key = hashQuestion({ format: format as QuestionFormat, slug });
        const sessionId = session.id;

        const sessionProgress = await prisma.learningSessionProgress.upsert({
          create: {
            key,
            sessionId,
            status: 'COMPLETED',
          },
          update: {},
          where: {
            sessionId_key: {
              key,
              sessionId,
            },
          },
        });

        return {
          newSessionCreated,
          questionProgress,
          sessionProgress,
          studyListName: studyList?.longName,
        };
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        format: z.string(),
        slug: z.string(),
        studyListKey: z.string().optional(),
      }),
    )
    .mutation(
      async ({ input: { slug, format, studyListKey }, ctx: { viewer } }) => {
        // Remove EITHER overall progress or learning session progress but not both.
        if (studyListKey) {
          const session = await prisma.learningSession.findFirst({
            where: {
              key: studyListKey,
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
      },
    ),
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
        studyListKey: z.string().optional(),
      }),
    )
    .query(async ({ input: { question, studyListKey }, ctx: { viewer } }) => {
      if (studyListKey) {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: studyListKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        if (session == null) {
          return null;
        }

        const [sessionProgress, questionProgress] = await Promise.all([
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

        if (!sessionProgress) {
          return null;
        }

        const [format, slug] = unhashQuestion(sessionProgress.key);
        const completeStatus: QuestionProgressStatus = 'complete';

        return {
          ...sessionProgress,
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
  getStudyListProgress: userProcedure
    .input(
      z.object({
        studyListKey: z.string(),
      }),
    )
    .query(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        where: {
          key: studyListKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.learningSessionProgress.findMany({
        where: {
          sessionId: session.id,
        },
      });
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
  importProgressToSession: userProcedure
    .input(
      z.object({
        questions: z.array(
          z.object({
            format: z.string(),
            slug: z.string(),
          }),
        ),
        studyListKey: z.string(),
      }),
    )
    .mutation(
      async ({ input: { questions, studyListKey }, ctx: { viewer } }) => {
        if (!viewer) {
          return null;
        }

        const session = await prisma.learningSession.findFirst({
          where: {
            key: studyListKey,
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

        await Promise.all([
          // Update the learning session updatedAt to sort by updatedAt in questionSessions.getActive query
          prisma.learningSession.update({
            data: {
              updatedAt: new Date(),
            },
            where: {
              id: session.id,
            },
          }),
          prisma.learningSessionProgress.createMany({
            data,
          }),
        ]);
      },
    ),
  resetSessionProgress: userProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { viewer } }) => {
      // Make sure the session is active.
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      if (session == null) {
        return null;
      }

      await prisma.learningSessionProgress.deleteMany({
        where: {
          sessionId,
        },
      });
    }),
});
