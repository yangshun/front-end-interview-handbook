import { z } from 'zod';

import type { QuestionFormat } from '~/components/interviews/questions/common/QuestionsTypes';

import { hashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

import { TRPCClientError } from '@trpc/client';

export const questionSessionRouter = router({
  get: userProcedure
    .input(
      z.object({
        studyListKey: z.string(),
      }),
    )
    .query(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const session = await prisma.learningSession.findFirst({
        include: {
          progress: true,
        },
        where: {
          key: studyListKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      return session;
    }),
  getActive: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.learningSession.findMany({
      include: {
        _count: {
          select: {
            progress: true,
          },
        },
      },
      where: {
        status: 'IN_PROGRESS',
        userId: viewer.id,
      },
    });
  }),
  getProgress: userProcedure
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
  importProgress: userProcedure
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

        await prisma.learningSessionProgress.createMany({
          data,
        });
      },
    ),
  resetProgress: userProcedure
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
  start: userProcedure
    .input(
      z.object({
        studyListKey: z.string(),
      }),
    )
    .mutation(async ({ input: { studyListKey }, ctx: { viewer } }) => {
      const existingSession = await prisma.learningSession.findFirst({
        where: {
          key: studyListKey,
          status: 'IN_PROGRESS',
          userId: viewer.id,
        },
      });

      // There's an existing session, return it.
      if (existingSession != null) {
        return existingSession;
      }

      // No existing session, create one.
      const createData = {
        key: studyListKey,
        userId: viewer.id,
      };

      return await prisma.learningSession.create({
        data: createData,
      });
    }),
  stop: userProcedure
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

      return await prisma.learningSession.update({
        data: {
          status: 'STOPPED',
          stoppedAt: new Date(),
        },
        where: {
          id: sessionId,
        },
      });
    }),
});
