import { z } from 'zod';

import type {
  InterviewsCommentActivity,
  InterviewsUpvoteActivity,
} from '~/components/interviews/activity/types';

import { fetchQuestion } from '~/db/QuestionsListReader';
import { unhashQuestion } from '~/db/QuestionsUtils';
import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

export const notificationsRouter = router({
  getUnreadCount: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.interviewsActivity.count({
      where: {
        read: false,
        recipientId: viewer.id,
      },
    });
  }),
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
      const [totalCount, notifications] = await Promise.all([
        prisma.interviewsActivity.count({
          where: {
            recipientId: viewer.id,
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
            recipientId: viewer.id,
          },
        }),
      ]);

      if (notifications.length === 0) {
        return {
          notifications: [],
          totalCount: 0,
        };
      }

      const finalNotifications = await Promise.all(
        notifications.map(async (notification) => {
          if (
            notification.category === 'DISCUSSION_UPVOTE' &&
            notification.vote
          ) {
            const [format, slug] = unhashQuestion(
              notification.vote.comment.entityId,
            );
            const { question: questionMetadata } = await fetchQuestion({
              format,
              slug,
            });

            return {
              ...notification,
              question: {
                format: questionMetadata.format,
                href: questionMetadata.href,
                slug: questionMetadata.slug,
                title: questionMetadata.title,
              },
            } as InterviewsUpvoteActivity;
          }
          if (notification.category === 'DISCUSSION' && notification.comment) {
            const [format, slug] = unhashQuestion(
              notification.comment.entityId,
            );
            const { question: questionMetadata } = await fetchQuestion({
              format,
              slug,
            });

            return {
              ...notification,
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
        notifications: finalNotifications.flatMap((notification) =>
          notification != null ? [notification] : [],
        ),
        totalCount,
      };
    }),
  markAsRead: userProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input: { id } }) => {
      await prisma.interviewsActivity.update({
        data: {
          read: true,
        },
        where: {
          id,
        },
      });
    }),
});
