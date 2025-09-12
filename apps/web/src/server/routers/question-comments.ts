import { InterviewsDiscussionCommentDomain, Prisma } from '@prisma/client';
import { z } from 'zod';

import { discussionsCommentBodySchemaServer } from '~/components/workspace/common/discussions/CodingWorkspaceDiscussionsComentBodySchema';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

export const questionCommentsRouter = router({
  create: userProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        domain: z.nativeEnum(InterviewsDiscussionCommentDomain),
        entityId: z.string(),
      }),
    )
    .mutation(
      async ({ ctx: { viewer }, input: { body, domain, entityId } }) => {
        const comment = await prisma.interviewsDiscussionComment.create({
          data: {
            body,
            domain,
            entityId,
            profileId: viewer.id,
          },
        });

        // TODO(discussions): Add activity triggers

        return comment;
      },
    ),
  delete: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { commentId } }) => {
      return await prisma.interviewsDiscussionComment.delete({
        where: {
          id: commentId,
          profileId: viewer.id,
        },
      });
    }),
  liked: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { commentId } }) => {
      return await prisma.interviewsDiscussionCommentVote.findFirst({
        select: {
          commentId: true,
        },
        where: {
          author: {
            id: viewer.id,
          },
          comment: {
            id: commentId,
          },
        },
      });
    }),
  list: publicProcedure
    .input(
      z.object({
        domain: z.nativeEnum(InterviewsDiscussionCommentDomain),
        entityId: z.string(),
        pagination: z.object({
          limit: z
            .number()
            .int()
            .positive()
            .transform((val) => Math.min(30, val)),
          page: z.number().int().positive(),
        }),
        sort: z.object({
          field: z.enum([
            Prisma.InterviewsDiscussionCommentScalarFieldEnum.createdAt,
            'votes',
          ]),
          isAscendingOrder: z.boolean(),
        }),
      }),
    )
    .query(async ({ input: { domain, entityId, pagination, sort } }) => {
      const { limit, page } = pagination;
      const commentIncludeFields = {
        _count: {
          select: {
            votes: true,
          },
        },
        author: {
          select: {
            avatarUrl: true,
            id: true,
            name: true,
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
        prisma.interviewsDiscussionComment.count({
          where: {
            domain,
            entityId,
            parentCommentId: null, // Fetch top-level comments only.
          },
        }),
        prisma.interviewsDiscussionComment.findMany({
          include: {
            replies: {
              include: commentIncludeFields,
              orderBy: { createdAt: 'asc' },
            },
            ...commentIncludeFields,
          },
          orderBy: sortBy,
          skip: (page - 1) * limit,
          take: limit,
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
        body: discussionsCommentBodySchemaServer,
        domain: z.nativeEnum(InterviewsDiscussionCommentDomain),
        entityId: z.string(),
        parentCommentId: z.string().uuid(),
        repliedToId: z.string().uuid().optional(),
      }),
    )
    .mutation(
      async ({
        ctx: { viewer },
        input: { body, domain, entityId, parentCommentId, repliedToId },
      }) => {
        const comment = await prisma.interviewsDiscussionComment.create({
          data: {
            body,
            domain,
            entityId,
            parentCommentId,
            profileId: viewer.id,
            repliedToId,
          },
        });

        // TODO(discussions): Add activity triggers

        return comment;
      },
    ),
  unvote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { commentId } }) => {
      return await prisma.interviewsDiscussionCommentVote.delete({
        where: {
          commentId_profileId: {
            commentId,
            profileId: viewer.id,
          },
        },
      });
    }),
  update: userProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { body, commentId } }) => {
      return await prisma.interviewsDiscussionComment.update({
        data: {
          body,
        },
        where: {
          id: commentId,
          profileId: viewer.id,
        },
      });
    }),
  vote: userProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { commentId } }) => {
      try {
        return await prisma.interviewsDiscussionCommentVote.create({
          data: {
            commentId,
            profileId: viewer.id,
          },
        });

        // TODO(discussions): Add activity triggers
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          // Ignore duplicate upvote.
          error.code === 'P2002'
        ) {
          // No-op.
          return;
        }
        throw error;
      }
    }),
});
