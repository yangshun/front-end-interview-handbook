import { z } from 'zod';

import { hashQuestion } from '~/db/QuestionsUtils';

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

      const session = await prisma.learningSession.findFirst({
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

      const session = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: user.id,
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
  markAsNotComplete: publicProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { format, slug, listKey }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      try {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: user.id,
          },
        });

        if (session == null) {
          return;
        }

        await prisma.learningSessionProgress.deleteMany({
          where: {
            key: hashQuestion(format, slug),
            sessionId: session.id,
          },
        });
      } catch {
        // TODO: Report error
      }
    }),
  markComplete: publicProcedure
    .input(
      z.object({
        format: z.string(),
        listKey: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { format, slug, listKey }, ctx: { user } }) => {
      if (!user) {
        return null;
      }

      try {
        const session = await prisma.learningSession.findFirst({
          where: {
            key: listKey,
            status: 'IN_PROGRESS',
            userId: user.id,
          },
        });

        if (session == null) {
          return;
        }

        return await prisma.learningSessionProgress.create({
          data: {
            key: hashQuestion(format, slug),
            sessionId: session.id,
            status: 'COMPLETED',
          },
        });
      } catch {
        // TODO: Report error
      }
    }),
  resetSessionProgress: publicProcedure
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
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: user.id,
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

      const existingSession = await prisma.learningSession.findFirst({
        where: {
          key: listKey,
          status: 'IN_PROGRESS',
          userId: user.id,
        },
      });

      // There's an existing session, return it.
      if (existingSession != null) {
        return existingSession;
      }

      // No existing session, create one.
      const createData = {
        key: listKey,
        userId: user.id,
      };

      return await prisma.learningSession.create({
        data: createData,
      });
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
      const session = await prisma.learningSession.findFirst({
        where: {
          id: sessionId,
          status: 'IN_PROGRESS',
          userId: user.id,
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
