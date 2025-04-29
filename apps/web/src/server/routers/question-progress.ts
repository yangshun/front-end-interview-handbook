import { z } from 'zod';

import { groupByDateFormatter } from '~/components/interviews/dashboard/progress/utils';
import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import { fetchInterviewsStudyList } from '~/db/contentlayer/InterviewsStudyListReader';
import {
  fetchQuestion,
  fetchQuestionsListByHash,
} from '~/db/QuestionsListReader';
import type { QuestionProgressStatus } from '~/db/QuestionsProgressTypes';
import { hashQuestion, unhashQuestion } from '~/db/QuestionsUtils';
import scheduleInterviewsProgressEmail from '~/emails/items/interviews-progress/EmailsSchedulerInterviewsProgress';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { TRPCClientError } from '@trpc/client';

const zodInterviewsQuestionFormats = z.enum([
  'javascript',
  'user-interface',
  'algo',
  'system-design',
  'quiz',
]);

export const questionProgressRouter = router({
  add: userProcedure
    .input(
      z.object({
        question: z.object({
          format: zodInterviewsQuestionFormats,
          slug: z.string(),
        }),
        studyListKey: z.string().optional(),
      }),
    )
    .mutation(
      async ({
        input: {
          question: { format, slug },
          studyListKey,
        },
        ctx: { viewer, locale },
      }) => {
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

        if (questionProgress) {
          try {
            await scheduleInterviewsProgressEmail({
              entity: format,
              userId: viewer.id,
            });
          } catch {
            // No-op, don't fail the mutation if cannot schedule
          }
        }

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
          fetchInterviewsStudyList(studyListKey, locale),
        ]);

        const key = hashQuestion({ format, slug });
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
        qnHashes: z.array(z.string()),
        studyListKey: z.string().optional(),
      }),
    )
    .mutation(
      async ({ input: { qnHashes, studyListKey }, ctx: { viewer } }) => {
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
              key: { in: qnHashes },
              sessionId: session.id,
            },
          });
        }

        const questionFilters = qnHashes.map((qnHash) => {
          const [format, slug] = unhashQuestion(qnHash);

          return { format, slug, userId: viewer.id };
        });

        return await prisma.questionProgress.deleteMany({
          where: {
            OR: questionFilters,
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
          format: zodInterviewsQuestionFormats,
          slug: z.string(),
        }),
        studyListKey: z.string().optional(),
      }),
    )
    .query(
      async ({
        input: { question: questionParam, studyListKey },
        ctx: { locale, viewer },
      }) => {
        const [userProfile, { question }] = await Promise.all([
          prisma.profile.findFirstOrThrow({
            select: {
              premium: true,
            },
            where: {
              id: viewer.id,
            },
          }),
          fetchQuestion(questionParam, locale),
        ]);
        const { metadata } = question;
        const isQuestionLockedForViewer =
          metadata?.access === 'premium' && !userProfile.premium;

        if (studyListKey) {
          const session = await prisma.learningSession.findFirst({
            where: {
              key: studyListKey,
              status: 'IN_PROGRESS',
              userId: viewer.id,
            },
          });

          if (session == null) {
            return { isQuestionLockedForViewer, questionProgress: null };
          }

          const [sessionProgress, questionProgress] = await Promise.all([
            prisma.learningSessionProgress.findFirst({
              where: {
                key: hashQuestion(metadata),
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
                format: metadata.format,
                slug: metadata.slug,
                userId: viewer.id,
              },
            }),
          ]);

          if (!sessionProgress) {
            return { isQuestionLockedForViewer, questionProgress: null };
          }

          const [format, slug] = unhashQuestion(sessionProgress.key);
          const completeStatus: QuestionProgressStatus = 'complete';

          return {
            isQuestionLockedForViewer,
            questionProgress: {
              ...sessionProgress,
              format,
              questionProgressId: questionProgress?.id,
              slug,
              status: completeStatus,
            },
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
            format: metadata.format,
            slug: metadata.slug,
            userId: viewer.id,
          },
        });

        if (!questionProgress) {
          return { isQuestionLockedForViewer, questionProgress: null };
        }

        return {
          isQuestionLockedForViewer,
          questionProgress: {
            ...questionProgress,
            format: questionProgress.format as QuestionFormat,
            status: questionProgress.status as QuestionProgressStatus,
          },
        };
      },
    ),
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
  getAllIncludingMetadata: userProcedure.query(
    async ({ ctx: { locale, viewer } }) => {
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

      const questionProgressMetadata = await fetchQuestionsListByHash(
        questionProgressList.map((qn) =>
          hashQuestion({ format: qn.format as QuestionFormat, slug: qn.slug }),
        ),
        locale,
      );

      const metadataMap = new Map(
        questionProgressMetadata.map(({ metadata, info }) => [
          hashQuestion(metadata),
          { info, metadata },
        ]),
      );

      return questionProgressList
        .map((progress) => {
          const content = metadataMap.get(
            hashQuestion({
              format: progress.format as QuestionFormat,
              slug: progress.slug,
            }),
          );

          if (content == null) {
            return null;
          }

          return {
            createdAt: progress.createdAt,
            id: progress.id,
            ...content,
          };
        })
        .flatMap((progress) => (progress == null ? [] : [progress]));
    },
  ),
  getContributionsCount: userProcedure
    .input(
      z.object({
        endTime: z.date(),
        startTime: z.date(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { startTime, endTime } }) => {
      const [questionProgress, guideProgress] = await Promise.all([
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
        format: zodInterviewsQuestionFormats,
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
            format: zodInterviewsQuestionFormats,
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
          (question) =>
            ({
              key: hashQuestion(question),
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
