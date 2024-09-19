import { z } from 'zod';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';

import { TRPCError } from '@trpc/server';

export const activityRouter = router({
  getAll: userProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        pagination: z.object({
          limit: z.number().min(1).max(100).default(10),
        }),
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input: { projectSlug, cursor, pagination } }) => {
      const project = await prisma.project.findUnique({
        select: { id: true },
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project not found!',
        });
      }

      const { limit } = pagination;

      const activities = await prisma.activity.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          post: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit + 1,
        where: {
          projectId: project.id,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (activities.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = activities.pop()!;

        nextCursor = nextItem.id;
      }

      return {
        activities,
        nextCursor,
      };
    }),
});
