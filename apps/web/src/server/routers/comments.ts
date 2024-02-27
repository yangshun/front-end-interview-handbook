import { allProjectsChallengeMetadata } from 'contentlayer/generated';
import { z } from 'zod';

import { discussionsCommentBodySchemaServer } from '~/components/discussions/DiscussionsCommentBodySchema';
import {
  projectsReputationCommentAwardPoints,
  projectsReputationCommentRevokePoints,
  projectsReputationCommentVoteAwardPoints,
  projectsReputationCommentVoteRevokePoints,
} from '~/components/projects/reputation/ProjectsReputationUtils';

import prisma from '~/server/prisma';

import { projectsUserProcedure } from './projects/procedures';
import { publicProcedure, router, userProcedure } from '../trpc';

import { DiscussionCommentDomain, Prisma } from '@prisma/client';

// TODO(prisma): Read from Prisma directly.
const domains = [
  DiscussionCommentDomain.PROJECTS_SUBMISSION,
  DiscussionCommentDomain.PROJECTS_CHALLENGE,
] as const;

export const commentsRouter = router({
  create: projectsUserProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        category: z.string().optional(),
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, category, body },
        ctx: { projectsProfileId },
      }) => {
        const comment = await prisma.projectsDiscussionComment.create({
          data: {
            body,
            category,
            domain,
            entityId,
            profileId: projectsProfileId,
          },
        });

        await projectsReputationCommentAwardPoints(comment, projectsProfileId);

        return comment;
      },
    ),
  delete: projectsUserProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { projectsProfileId } }) => {
      const deletedComment = await prisma.projectsDiscussionComment.delete({
        where: {
          id: commentId,
          profileId: projectsProfileId,
        },
      });

      await projectsReputationCommentRevokePoints(deletedComment);

      return deletedComment;
    }),
  liked: userProcedure
    .input(
      z.object({
        domain: z.enum(domains),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { domain, entityId }, ctx: { user } }) => {
      const likedComments = await prisma.projectsDiscussionCommentVote.findMany(
        {
          select: {
            commentId: true,
          },
          where: {
            author: {
              userId: user.id,
            },
            comment: {
              domain,
              entityId,
            },
          },
        },
      );

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
          include: {
            userProfile: true,
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
        prisma.projectsDiscussionComment.count({
          where: {
            entityId,
          },
        }),
        prisma.projectsDiscussionComment.findMany({
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
  listUserComments: publicProcedure
    .input(
      z.object({
        domainList: z.array(z.enum(domains)),
        userId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ input: { domainList, userId }, ctx: { user } }) => {
      const comments = await prisma.projectsDiscussionComment.findMany({
        include: {
          author: {
            select: {
              userProfile: {
                select: {
                  avatarUrl: true,
                  name: true,
                  username: true,
                },
              },
            },
          },
          parentComment: {
            include: {
              author: {
                select: {
                  userProfile: {
                    select: {
                      avatarUrl: true,
                      name: true,
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          author: {
            userId: userId ?? user?.id,
          },
          domain: {
            in: domainList,
          },
        },
      });

      const commentsWithInfo = Promise.all(
        comments.map(async (comment) => {
          if (comment.domain === DiscussionCommentDomain.PROJECTS_CHALLENGE) {
            const challengeMetadata = allProjectsChallengeMetadata.find(
              (challenge) => challenge.slug === comment.entityId,
            );

            if (!challengeMetadata?.href || !challengeMetadata?.title) {
              return comment;
            }

            return {
              ...comment,
              entity: {
                href: challengeMetadata.href,
                title: challengeMetadata.title,
              },
            };
          }
          if (comment.domain === DiscussionCommentDomain.PROJECTS_SUBMISSION) {
            const title = await prisma.projectsChallengeSubmission.findUnique({
              select: {
                title: true,
              },
              where: {
                id: comment.entityId,
              },
            });

            if (!title?.title) {
              return comment;
            }

            return {
              ...comment,
              entity: {
                href: `/projects/s/${comment.entityId}`,
                title: title.title,
              },
            };
          }

          return comment;
        }),
      );

      return commentsWithInfo;
    }),
  reply: projectsUserProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        domain: z.enum(domains),
        entityId: z.string(),
        parentCommentId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, body, parentCommentId },
        ctx: { projectsProfileId },
      }) => {
        const comment = await prisma.projectsDiscussionComment.create({
          data: {
            body,
            domain,
            entityId,
            parentCommentId,
            profileId: projectsProfileId,
          },
        });

        await projectsReputationCommentAwardPoints(comment, projectsProfileId);

        return comment;
      },
    ),
  unvote: projectsUserProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { projectsProfileId } }) => {
      const deletedVote = await prisma.projectsDiscussionCommentVote.delete({
        where: {
          commentId_profileId: {
            commentId,
            profileId: projectsProfileId,
          },
        },
      });

      await projectsReputationCommentVoteRevokePoints(deletedVote);
    }),
  update: projectsUserProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        commentId: z.string().uuid(),
      }),
    )
    .mutation(
      async ({ input: { commentId, body }, ctx: { projectsProfileId } }) => {
        return await prisma.projectsDiscussionComment.update({
          data: {
            body,
          },
          where: {
            id: commentId,
            profileId: projectsProfileId,
          },
        });
      },
    ),
  vote: projectsUserProcedure
    .input(
      z.object({
        commentId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { commentId }, ctx: { projectsProfileId } }) => {
      try {
        const vote = await prisma.projectsDiscussionCommentVote.create({
          data: {
            commentId,
            profileId: projectsProfileId,
          },
        });

        await projectsReputationCommentVoteAwardPoints(vote);
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
