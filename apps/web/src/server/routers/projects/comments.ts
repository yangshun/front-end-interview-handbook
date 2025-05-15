import { Prisma, ProjectsDiscussionCommentDomain } from '@prisma/client';
import { z } from 'zod';

import { discussionsCommentBodySchemaServer } from '~/components/projects/discussions/ProjectsDiscussionsCommentBodySchema';
import {
  projectsNotificationForComment,
  projectsNotificationForReply,
} from '~/components/projects/notifications/ProjectsNotificationUtils';
import {
  projectsReputationCommentAwardPoints,
  projectsReputationCommentRevokePoints,
  projectsReputationCommentVoteAwardPoints,
  projectsReputationCommentVoteRevokePoints,
} from '~/components/projects/reputation/ProjectsReputationUtils';

import { fetchProjectsChallengeMetadata } from '~/db/contentlayer/projects/ProjectsChallengeMetadataReader';
import { readProjectsChallengeInfo } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../../trpc';
import { projectsUserProcedure } from './procedures';

export const projectsCommentsRouter = router({
  create: projectsUserProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        category: z.string().optional(),
        domain: z.nativeEnum(ProjectsDiscussionCommentDomain),
        entityId: z.string(),
        entityOwnerId: z.string().uuid().optional(),
      }),
    )
    .mutation(
      async ({
        input: { entityId, domain, category, body, entityOwnerId },
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

        // Commenting to others submission
        if (
          domain === ProjectsDiscussionCommentDomain.PROJECTS_SUBMISSION &&
          entityOwnerId !== projectsProfileId &&
          entityOwnerId
        ) {
          await projectsNotificationForComment(
            comment.id,
            entityOwnerId,
            entityId,
          );
        }
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
        domain: z.nativeEnum(ProjectsDiscussionCommentDomain),
        entityId: z.string(),
      }),
    )
    .query(async ({ input: { domain, entityId }, ctx: { viewer } }) => {
      const likedComments = await prisma.projectsDiscussionCommentVote.findMany(
        {
          select: {
            commentId: true,
          },
          where: {
            author: {
              userId: viewer.id,
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
        domain: z.nativeEnum(ProjectsDiscussionCommentDomain),
        entityId: z.string(),
        sort: z.object({
          field: z.enum([
            Prisma.ProjectsDiscussionCommentScalarFieldEnum.createdAt,
            'votes',
          ]),
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
            points: true,
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
      // TODO(projects): paginate this query because each comment can be mapped
      // to a submission and it can be very expensive for users with many comments.
      z.object({
        contributionType: z.array(z.string()),
        domainList: z.array(z.nativeEnum(ProjectsDiscussionCommentDomain)),
        forumType: z.array(z.string()),
        userId: z.string().uuid().optional(),
      }),
    )
    .query(
      async ({
        input: { contributionType, domainList, forumType, userId },
        ctx: { viewer },
      }) => {
        const categoryWhere = contributionType.includes('OTHER')
          ? [
              {
                category: {
                  in: contributionType,
                },
              },
              {
                category: null,
              },
            ]
          : [
              {
                category: {
                  in: contributionType,
                },
              },
            ];
        const authorWhere = {
          userId: userId ?? viewer?.id,
        };
        const domainWhere = {
          in:
            forumType.length === 0
              ? domainList
              : domainList.filter((domain) => forumType.includes(domain)),
        };
        const where =
          contributionType.length === 0
            ? {
                author: authorWhere,
                domain: domainWhere,
              }
            : {
                OR: categoryWhere,
                author: authorWhere,
                domain: domainWhere,
              };

        const comments = await prisma.projectsDiscussionComment.findMany({
          include: {
            author: {
              select: {
                userId: true,
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
                    userId: true,
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
          where,
        });

        const commentsWithInfo = await Promise.all(
          comments.map(async (comment) => {
            if (
              comment.domain ===
              ProjectsDiscussionCommentDomain.PROJECTS_CHALLENGE
            ) {
              const [challengeMetadata, { challengeInfo }] = await Promise.all([
                fetchProjectsChallengeMetadata(comment.entityId),
                readProjectsChallengeInfo(comment.entityId),
              ]);

              // Non-existent challenge, ignore comment.
              if (challengeMetadata == null || challengeInfo == null) {
                return null;
              }

              return {
                ...comment,
                entity: {
                  href: challengeMetadata.href,
                  title: challengeInfo.title,
                },
              };
            }
            if (
              comment.domain ===
              ProjectsDiscussionCommentDomain.PROJECTS_SUBMISSION
            ) {
              const submission =
                await prisma.projectsChallengeSubmission.findUnique({
                  include: {
                    projectsProfile: {
                      include: {
                        userProfile: true,
                      },
                    },
                  },
                  where: {
                    id: comment.entityId,
                  },
                });

              // Non-existent submission, possibly deleted. Ignore comment.
              if (submission == null) {
                return null;
              }

              const submissionAuthorName =
                submission?.projectsProfile?.userProfile.name;
              const submissionAuthorUserName =
                submission?.projectsProfile?.userProfile.username;
              const submissionAuthorUserId =
                submission?.projectsProfile?.userProfile.id;

              if (!submission?.title || !submissionAuthorName) {
                return comment;
              }

              return {
                ...comment,
                entity: {
                  href: submission.hrefs.detail,
                  recipient: {
                    id: submissionAuthorUserId,
                    name: submissionAuthorName,
                    username: submissionAuthorUserName,
                  },
                  title: submission.title,
                },
              };
            }

            return comment;
          }),
        );

        // Typesafe way to filter out nulls.
        return commentsWithInfo.flatMap((comment) =>
          comment != null ? [comment] : [],
        );
      },
    ),
  reply: projectsUserProcedure
    .input(
      z.object({
        body: discussionsCommentBodySchemaServer,
        domain: z.nativeEnum(ProjectsDiscussionCommentDomain),
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

        await Promise.all([
          projectsNotificationForReply(
            comment.id,
            projectsProfileId,
            entityId,
            domain,
          ),
          projectsReputationCommentAwardPoints(comment, projectsProfileId),
        ]);

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
