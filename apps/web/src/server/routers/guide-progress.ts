import { GuidebookItem } from '@prisma/client';
import { z } from 'zod';

import { hashGuide } from '~/db/guides/GuidesUtils';
import scheduleInterviewsProgressEmail from '~/emails/items/interviews-progress/EmailsSchedulerInterviewsProgress';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const guideProgressRouter = router({
  add: userProcedure
    .input(
      z.object({
        book: z.nativeEnum(GuidebookItem),
        slug: z.string(),
        studyListKey: z.string().optional(),
        // Only used by the client for showing within the response toast.
        title: z.string(),
      }),
    )
    .mutation(
      async ({ ctx: { viewer }, input: { book, slug, studyListKey } }) => {
        if (!viewer) {
          return null;
        }

        const guideProgress = await prisma.guideProgress.upsert({
          create: {
            book,
            slug,
            status: 'COMPLETED',
            userId: viewer.id,
          },
          update: {},
          where: {
            book_slug_status_userId: {
              book,
              slug,
              status: 'COMPLETED',
              userId: viewer.id,
            },
          },
        });

        if (guideProgress) {
          try {
            await scheduleInterviewsProgressEmail({
              entity: 'article',
              userId: viewer.id,
            });
          } catch {
            // No-op, don't fail the mutation if cannot schedule
          }
        }

        if (studyListKey == null) {
          return guideProgress;
        }

        const session = await prisma.learningSession.findFirst({
          where: {
            key: studyListKey,
            status: 'IN_PROGRESS',
            userId: viewer.id,
          },
        });

        // TODO(interviews): start learning session automatically like for questions.
        if (session == null) {
          throw new Error(
            'No ongoing learning session. Start tracking progress first.',
          );
        }

        return await prisma.learningSessionProgress.create({
          data: {
            key: hashGuide(book, slug),
            sessionId: session.id,
            status: 'COMPLETED',
          },
        });
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        book: z.nativeEnum(GuidebookItem),
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { book, slug } }) => {
      await prisma.guideProgress.deleteMany({
        where: {
          book,
          slug,
          userId: viewer.id,
        },
      });
    }),
  deleteAll: userProcedure.mutation(async ({ ctx: { viewer } }) => {
    await prisma.guideProgress.deleteMany({
      where: {
        userId: viewer.id,
      },
    });
  }),
  get: userProcedure
    .input(
      z.object({
        guide: z.object({
          book: z.nativeEnum(GuidebookItem),
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { guide } }) => {
      const guideProgress = await prisma.guideProgress.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          book: true,
          createdAt: true,
          id: true,
          slug: true,
          status: true,
          userId: true,
        },
        where: {
          book: guide.book,
          slug: guide.slug,
          userId: viewer.id,
        },
      });

      if (!guideProgress) {
        return null;
      }

      return guideProgress;
    }),
  getAll: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.guideProgress.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        book: true,
        createdAt: true,
        id: true,
        slug: true,
        status: true,
        userId: true,
      },
      where: {
        userId: viewer.id,
      },
    });
  }),
});
