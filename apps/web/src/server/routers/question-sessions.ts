import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

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
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'IN_PROGRESS',
        userId: viewer.id,
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
