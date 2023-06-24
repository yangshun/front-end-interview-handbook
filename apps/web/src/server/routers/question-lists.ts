import { z } from 'zod';

import { publicProcedure, router } from '../trpc';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const questionListsRouter = router({
  getActiveSession: publicProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      const session = await prisma.questionListSession.findFirst({
        include: {
          progress: true,
        },
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: user.id,
        },
      });

      return session;
    }),
  getActiveSessions: publicProcedure.query(async ({ ctx: { user } }) => {
    if (!user) {
      return null;
    }

    return await prisma.questionListSession.findMany({
      include: {
        _count: {
          select: {
            progress: true,
          },
        },
      },
      where: {
        status: 'IN_PROGRESS',
        userId: user.id,
      },
    });
  }),
  getSessionProgress: publicProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .query(async ({ input: { listKey }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      const session = await prisma.questionListSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: user.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.questionListSessionProgress.findMany({
        where: {
          sessionId: session.id,
        },
      });
    }),
  startSession: publicProcedure
    .input(
      z.object({
        listKey: z.string(),
      }),
    )
    .mutation(async ({ input: { listKey }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      const createData = {
        key: listKey,
        userId: user.id,
      };

      const session = await prisma.questionListSession.create({
        data: createData,
      });

      return session;
    }),
  stopSession: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      }),
    )
    .mutation(async ({ input: { sessionId }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      // Make sure the session is active.
      const session = await prisma.questionListSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: user.id,
        },
      });

      if (session == null) {
        return null;
      }

      return await prisma.questionListSession.update({
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
