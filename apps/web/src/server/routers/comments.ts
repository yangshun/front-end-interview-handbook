import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

const domains = ['PROJECTS_SUBMISSION', 'PROJECTS_CHALLENGE'] as const;

export const commentsRouter = router({
  create: userProcedure
    .input(
      z.object({
        category: z.string().optional(),
        content: z.string().trim().max(40000),
        domain: z.enum(domains),
        entityId: z.string(),
        parentCommentId: z.string().uuid().optional(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, category, content, parentCommentId },
        ctx: { user },
      }) => {
        return await prisma.discussionComment.create({
          data: {
            category,
            content,
            domain,
            entityId,
            parentCommentId,
            userId: user.id,
          },
        });
      },
    ),
  list: publicProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { entityId } }) => {
      const commentIncludeFields = {
        _count: {
          select: {
            votes: true,
          },
        },
        user: {
          select: {
            avatarUrl: true,
            id: true,
            name: true,
            title: true,
            username: true,
          },
        },
      };

      return await prisma.discussionComment.findMany({
        include: {
          replies: {
            include: {
              replies: {
                include: commentIncludeFields,
              },
              ...commentIncludeFields,
            },
          },
          ...commentIncludeFields,
        },
        where: {
          entityId,
          parentCommentId: null, // Fetch top-level comments only.
        },
      });
    }),
});
