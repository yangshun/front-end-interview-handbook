import { z } from 'zod';

import type { GuideCategory } from '~/components/guides/types';

import type { GuideProgressStatus } from '~/db/guides/GuideProgressTypes';
import { hashGuide } from '~/db/guides/GuidesUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const guideProgressRouter = router({
  add: userProcedure
    .input(
      z.object({
        category: z.string(),
        guideName: z.string(),
        listKey: z.string().optional(),
        progressId: z.string().optional(),
        slug: z.string(),
        status: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { category, slug, status, progressId, listKey },
        ctx: { viewer },
      }) => {
        if (!viewer) {
          return null;
        }

        const createData = {
          category,
          slug,
          status,
          userId: viewer.id,
        };
        let guideProgress = null;

        if (!progressId) {
          guideProgress = await prisma.guideProgress.create({
            data: createData,
          });
        } else {
          guideProgress = await prisma.guideProgress.upsert({
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
                  key: hashGuide(category, slug),
                  sessionId: session.id,
                  status: 'COMPLETED',
                },
              });
            }
          } catch {
            // TODO(interviews): Report error
          }
        }

        return {
          ...guideProgress,
          status: guideProgress.status as GuideProgressStatus,
          type: guideProgress.category as GuideCategory,
        };
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        category: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input: { slug, category }, ctx: { viewer } }) => {
      await prisma.guideProgress.deleteMany({
        where: {
          category,
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
          category: z.string(),
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
          category: true,
          createdAt: true,
          id: true,
          slug: true,
          status: true,
        },
        where: {
          category: guide.category,
          slug: guide.slug,
          userId: viewer.id,
        },
      });

      if (!guideProgress) {
        return null;
      }

      return {
        ...guideProgress,
        status: guideProgress.status as GuideProgressStatus,
        type: guideProgress.category as GuideCategory,
      };
    }),
  getAll: userProcedure.query(async ({ ctx: { viewer } }) => {
    const guideProgressList = await prisma.guideProgress.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        category: true,
        createdAt: true,
        id: true,
        slug: true,
        status: true,
      },
      where: {
        userId: viewer.id,
      },
    });

    return guideProgressList.map((guideProgress) => ({
      ...guideProgress,
      status: guideProgress.status as GuideProgressStatus,
      type: guideProgress.category as GuideCategory,
    }));
  }),
});
