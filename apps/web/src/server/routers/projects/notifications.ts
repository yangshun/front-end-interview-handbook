import { ProjectsDiscussionCommentDomain } from '@prisma/client';
import { z } from 'zod';

import type { ProjectsNotificationAugmentedType } from '~/components/projects/notifications/types';

import { fetchProjectsChallengeMetadata } from '~/db/contentlayer/projects/ProjectsChallengeMetadataReader';
import { readProjectsChallengeInfo } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { router } from '~/server/trpc';

import { projectsUserProcedure } from './procedures';

export const projectsNotificationsRouter = router({
  getUnreadCount: projectsUserProcedure.query(
    async ({ ctx: { projectsProfileId } }) => {
      const profile = await prisma.projectsProfile.findUnique({
        where: {
          id: projectsProfileId,
        },
      });

      return await prisma.projectsNotification.count({
        where: {
          createdAt: {
            gt: profile?.lastSeenNotification,
          },
          profileId: projectsProfileId,
          read: false,
        },
      });
    },
  ),
  lastSeenNotification: projectsUserProcedure.mutation(
    async ({ ctx: { projectsProfileId } }) => {
      await prisma.projectsProfile.update({
        data: {
          lastSeenNotification: new Date(),
        },
        where: {
          id: projectsProfileId,
        },
      });
    },
  ),
  list: projectsUserProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        pagination: z.object({
          limit: z.number().min(1).max(100).default(10),
        }),
      }),
    )
    .query(
      async ({ ctx: { projectsProfileId }, input: { cursor, pagination } }) => {
        const notifications = await prisma.projectsNotification.findMany({
          cursor: cursor ? { id: cursor } : undefined,
          include: {
            comment: {
              include: {
                author: {
                  select: {
                    points: true,
                    userId: true,
                    userProfile: {
                      select: {
                        avatarUrl: true,
                        company: true,
                        currentStatus: true,
                        id: true,
                        name: true,
                        startWorkDate: true,
                        title: true,
                        username: true,
                      },
                    },
                  },
                },
                parentComment: true,
              },
            },
            projectsProfile: {
              include: {
                userProfile: {
                  select: {
                    username: true,
                  },
                },
              },
            },
            submission: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: pagination.limit + 1,
          where: {
            profileId: projectsProfileId,
          },
        });

        let nextCursor: typeof cursor | undefined = undefined;

        if (notifications.length > pagination.limit) {
          // Remove the last item and use it as next cursor

          const nextItem = notifications.pop()!;

          nextCursor = nextItem.id;
        }

        const finalNotifications = await Promise.all(
          notifications.map(async (notification) => {
            if (
              notification.comment?.domain ===
              ProjectsDiscussionCommentDomain.PROJECTS_CHALLENGE
            ) {
              const data = notification.data as { challengeId: string };
              const [challengeMetadata, { challengeInfo }] = await Promise.all([
                fetchProjectsChallengeMetadata(data?.challengeId),
                readProjectsChallengeInfo(data.challengeId),
              ]);

              return {
                ...notification,
                challenge: {
                  href: challengeMetadata?.resourcesDiscussionsHref,
                  title: challengeInfo.title,
                },
              };
            }

            return notification;
          }),
        );

        return {
          nextCursor,
          notifications: finalNotifications.flatMap((notification) =>
            notification != null ? [notification] : [],
          ) as Array<ProjectsNotificationAugmentedType>,
        };
      },
    ),
  markAsRead: projectsUserProcedure
    .input(
      z.object({
        ids: z.array(z.string().uuid()),
      }),
    )
    .mutation(async ({ input: { ids } }) => {
      await prisma.projectsNotification.updateMany({
        data: {
          read: true,
        },
        where: {
          id: {
            in: ids,
          },
        },
      });
    }),
});
