import { z } from 'zod';

import type {
  InterviewsCommentActivity,
  InterviewsUpvoteActivity,
} from '~/components/interviews/activity/types';

import { fetchQuestion } from '~/db/QuestionsListReader';
import { unhashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const communityContributionsRouter = router({
  list: userProcedure
    .input(
      z.object({
        pagination: z.object({
          limit: z
            .number()
            .int()
            .positive()
            .transform((val) => Math.min(30, val)),
          page: z.number().int().positive(),
        }),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { pagination } }) => {
      const { limit, page } = pagination;
      const [totalCount, contributions] = await Promise.all([
        prisma.interviewsActivity.count({
          where: {
            actorId: viewer.id,
          },
        }),
        prisma.interviewsActivity.findMany({
          include: {
            actor: {
              select: {
                avatarUrl: true,
                id: true,
                name: true,
                username: true,
              },
            },
            comment: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                  },
                },
                parentComment: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
                repliedTo: {
                  include: {
                    author: {
                      select: {
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
              },
            },
            vote: {
              include: {
                comment: {
                  include: {
                    author: {
                      select: {
                        id: true,
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
          skip: (page - 1) * limit,
          take: limit,
          where: {
            actorId: viewer.id,
          },
        }),
      ]);

      if (contributions.length === 0) {
        return {
          contributions: [],
          totalCount: 0,
        };
      }

      const finalContributions = await Promise.all(
        contributions.map(async (contribution) => {
          if (
            contribution.category === 'DISCUSSION_UPVOTE' &&
            contribution.vote
          ) {
            const [format, slug] = unhashQuestion(
              contribution.vote.comment.entityId,
            );
            const { question: questionMetadata } = await fetchQuestion({
              format,
              slug,
            });

            return {
              ...contribution,
              question: {
                format: questionMetadata.format,
                href: questionMetadata.href,
                slug: questionMetadata.slug,
                title: questionMetadata.title,
              },
            } as InterviewsUpvoteActivity;
          }
          if (contribution.category === 'DISCUSSION' && contribution.comment) {
            const [format, slug] = unhashQuestion(
              contribution.comment.entityId,
            );
            const { question: questionMetadata } = await fetchQuestion({
              format,
              slug,
            });

            return {
              ...contribution,
              question: {
                format: questionMetadata.format,
                href: questionMetadata.href,
                slug: questionMetadata.slug,
                title: questionMetadata.title,
              },
            } as InterviewsCommentActivity;
          }

          return null;
        }),
      );

      return {
        contributions: finalContributions.flatMap((contribution) =>
          contribution != null ? [contribution] : [],
        ),
        totalCount,
      };
    }),
});
