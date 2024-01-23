import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { DiscussionCommentDomain, Prisma } from '@prisma/client';

// TODO(prisma): Read from Prisma directly.
const domains = [
  DiscussionCommentDomain.PROJECTS_SUBMISSION,
  DiscussionCommentDomain.PROJECTS_CHALLENGE,
] as const;

export const commentsRouter = router({
  create: userProcedure
    .input(
      z.object({
        // TODO(projects): reuse validation on client.
        body: z.string().trim().min(10).max(40000),
        category: z.string().optional(),
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, category, body },
        ctx: { user },
      }) => {
        return await prisma.discussionComment.create({
          data: {
            body,
            category,
            domain,
            entityId,
            userId: user.id,
          },
        });
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      return await prisma.discussionComment.delete({
        where: {
          id: commentId,
          userId: user.id,
        },
      });
    }),
  liked: userProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { domain, entityId }, ctx: { user } }) => {
      const likedComments = await prisma.discussionCommentVote.findMany({
        select: {
          commentId: true,
        },
        where: {
          comment: {
            domain,
            entityId,
          },
          userId: user.id,
        },
      });

      return likedComments.map(({ commentId }) => commentId);
    }),
  list: publicProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
        sort: z.object({
          field: z.enum(['createdAt', 'votes']),
          isAscendingOrder: z.boolean(),
        }),
      }),
    )
    .query(async ({ input: { domain, entityId, sort } }) => {
      const commentIncludeFields = {
        _count: {
          select: {
            votes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            currentStatus: true,
            id: true,
            name: true,
            startWorkDate: true,
            title: true,
            username: true,
          },
        },
      };

      const sortBy =
        sort.field === 'votes'
          ? ({
              votes: {
                _count: sort.isAscendingOrder ? 'asc' : 'desc',
              },
            } as const)
          : ({
              createdAt: sort.isAscendingOrder ? 'asc' : 'desc',
            } as const);

      const [count, comments] = await Promise.all([
        prisma.discussionComment.count({
          where: {
            entityId,
          },
        }),
        prisma.discussionComment.findMany({
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
          orderBy: sortBy,
          where: {
            domain,
            entityId,
            parentCommentId: null, // Fetch top-level comments only.
          },
        }),
      ]);

      return {
        comments,
        count,
      };
    }),
  reply: userProcedure
    .input(
      z.object({
        // TODO(projects): reuse validation on client.
        body: z.string().trim().min(10).max(40000),
        domain: z.enum(domains),
        entityId: z.string(),
        parentCommentId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, body, parentCommentId },
        ctx: { user },
      }) => {
        return await prisma.discussionComment.create({
          data: {
            body,
            domain,
            entityId,
            parentCommentId,
            userId: user.id,
          },
        });
      },
    ),
  unvote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      await prisma.discussionCommentVote.deleteMany({
        where: {
          commentId,
          userId: user.id,
        },
      });
    }),
  update: userProcedure
    .input(
      z.object({
        // TODO(projects): reuse validation on client.
        body: z.string().trim().min(10).max(40000),
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId, body }, ctx: { user } }) => {
      return await prisma.discussionComment.update({
        data: {
          body,
        },
        where: {
          id: commentId,
          userId: user.id,
        },
      });
    }),
  vote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { user } }) => {
      try {
        await prisma.discussionCommentVote.create({
          data: {
            commentId,
            userId: user.id,
          },
        });
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === 'P2002'
        ) {
          // No-op.
          return;
        }
        throw err;
      }
    }),
});
