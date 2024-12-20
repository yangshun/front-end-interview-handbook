import { z } from 'zod';

import { hashGuide } from '~/db/guides/GuidesUtils';
import { triggerCompletedSomeQuestionsEmail } from '~/emails/items/questions-completion/EmailsSenderCompletedSomeQuestions';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

const guidebookZodEnum = z.enum([
  'BEHAVIORAL_INTERVIEW_PLAYBOOK',
  'FRONT_END_INTERVIEW_PLAYBOOK',
  'FRONT_END_SYSTEM_DESIGN_PLAYBOOK',
]);

export const guideProgressRouter = router({
  add: userProcedure
    .input(
      z.object({
        book: guidebookZodEnum,
        slug: z.string(),
        studyListKey: z.string().optional(),
        // Only used by the client for showing within the response toast.
        title: z.string(),
      }),
    )
    .mutation(
      async ({ input: { book, slug, studyListKey }, ctx: { viewer } }) => {
        if (!viewer) {
          return null;
        }

        try {
          const guideProgress = await prisma.guideProgress.create({
            data: {
              book,
              slug,
              status: 'COMPLETED',
              userId: viewer.id,
            },
          });

          // Trigger completed some questions transactional email
          triggerCompletedSomeQuestionsEmail({
            email: viewer.email,
            format: 'article',
            userId: viewer.id,
          });

          if (studyListKey == null) {
            return guideProgress;
          }
        } catch (_err) {
          // Do nothing because it's a unique index.
        }

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
        book: guidebookZodEnum,
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug, book }, ctx: { viewer } }) => {
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
          book: guidebookZodEnum,
          slug: z.string(),
        }),
      }),
    )
    .query(async ({ input: { guide }, ctx: { viewer } }) => {
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
