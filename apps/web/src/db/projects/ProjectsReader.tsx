import type {
  ProjectsChallengeAPIWriteup,
  ProjectsChallengeGuide,
  ProjectsChallengeMetadata,
  ProjectsChallengeStyleGuide,
} from 'contentlayer/generated';
import {
  allProjectsChallengeAPIWriteups,
  allProjectsChallengeGuides,
  allProjectsChallengeMetadata,
  allProjectsChallengeStyleGuides,
  allProjectsTrackMetadata,
} from 'contentlayer/generated';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type { ProjectsProfileAvatarDataSlim } from '~/components/projects/types';

import prisma from '~/server/prisma';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

export async function fetchSessionsForUserGroupedBySlug(
  userId?: string | null,
): Promise<Record<string, ProjectsChallengeSessionStatus> | null> {
  if (userId == null) {
    return null;
  }

  const sessionsForUserGrouped: Record<string, ProjectsChallengeSessionStatus> =
    {};

  const sessionsForUser = await prisma.projectsChallengeSession.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      projectsProfile: {
        userProfile: {
          id: userId,
        },
      },
      status: {
        not: 'STOPPED',
      },
    },
  });

  sessionsForUser?.forEach((session) => {
    sessionsForUserGrouped[session.slug] = session.status;
  });

  return sessionsForUserGrouped;
}

export async function fetchChallengeAccessForUserGroupedBySlug(
  userId?: string | null,
): Promise<Set<string> | null> {
  if (userId == null) {
    return null;
  }

  const accessForUser = await prisma.projectsChallengeAccess.findMany({
    where: {
      projectsProfile: {
        userProfile: {
          id: userId,
        },
      },
    },
  });

  return new Set<string>(accessForUser.map(({ slug }) => slug));
}

export async function fetchSubmissionCommentCountsGroupedById(
  submissionIds: Array<string>,
): Promise<Record<string, number>> {
  const commentsCount: Record<string, number> = {};

  const countsList = await prisma.projectsDiscussionComment.groupBy({
    _count: {
      id: true,
    },
    by: ['entityId'],
    where: {
      entityId: {
        in: submissionIds,
      },
    },
  });

  countsList?.forEach(({ _count, entityId }) => {
    commentsCount[entityId] = _count.id;
  });

  return commentsCount;
}

export async function readProjectsChallengeList(
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  loadedLocale: string;
}> {
  const [
    sessionsForUserGroupedBySlug,
    challengeAccessSet,
    completedCountsGroupedBySlug,
    completedProfileIdsGroupedBySlug,
  ] = await Promise.all([
    fetchSessionsForUserGroupedBySlug(userId),
    fetchChallengeAccessForUserGroupedBySlug(userId),
    (async () => {
      try {
        const countsForProjectList =
          await prisma.projectsChallengeSession.groupBy({
            _count: true,
            by: ['slug'],
            where: {
              status: 'COMPLETED',
            },
          });

        const countsForProject: Record<string, number> = {};

        countsForProjectList?.forEach((projectCount) => {
          countsForProject[projectCount.slug] = projectCount._count;
        });

        return countsForProject;
      } catch (_err) {
        return null;
      }
    })(),
    (async () => {
      type CompletedProfileIdsWithSlug = Readonly<{
        avatarUrl: string;
        name: string;
        profileId: string;
        slug: string;
        username: string;
      }>;

      const limit = 4;

      try {
        const completedProfileIds: Array<CompletedProfileIdsWithSlug> =
          await prisma.$queryRaw`SELECT q.slug, q."profileId", s.name, s.username, s."avatarUrl"
          FROM (SELECT DISTINCT p_outer.slug, p_top."profileId"
          FROM (SELECT DISTINCT slug FROM public."ProjectsChallengeSession") p_outer
          JOIN LATERAL (
            SELECT * FROM public."ProjectsChallengeSession" p_inner
            WHERE p_inner.slug = p_outer.slug
            AND p_inner."status" = 'COMPLETED'
            LIMIT ${limit}
          ) p_top ON TRUE
          ORDER BY p_outer.slug) q
          INNER JOIN public."ProjectsProfile" r ON q."profileId" = r.id
          INNER JOIN public."Profile" s ON r."userId"=s.id`;

        const slugToCompletedProfileIds: Record<
          string,
          Array<ProjectsProfileAvatarDataSlim>
        > = {};

        completedProfileIds.forEach((row) => {
          if (!slugToCompletedProfileIds[row.slug]) {
            slugToCompletedProfileIds[row.slug] = [];
          }

          slugToCompletedProfileIds[row.slug].push({
            avatarUrl: row.avatarUrl,
            id: row.profileId,
            name: row.name,
            username: row.username,
          });
        });

        return slugToCompletedProfileIds;
      } catch (_err) {
        return null;
      }
    })(),
  ]);

  const challenges = allProjectsChallengeMetadata
    .filter((challengeItem) =>
      challengeItem._raw.flattenedPath.endsWith(requestedLocale),
    )
    .map((challengeMetadata) =>
      challengeItemAddTrackMetadata({
        completedCount:
          completedCountsGroupedBySlug?.[challengeMetadata.slug] ?? null,
        completedProfiles:
          completedProfileIdsGroupedBySlug?.[challengeMetadata.slug] ?? [],
        metadata: challengeMetadata,
        status: sessionsForUserGroupedBySlug?.[challengeMetadata.slug] ?? null,
        userUnlocked: challengeAccessSet?.has(challengeMetadata.slug) ?? null,
      }),
    );

  return {
    challenges,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeItem(
  slugParam: string,
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<
  Readonly<{
    challenge: ProjectsChallengeItem;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const { challengeMetadata } = await readProjectsChallengeMetadata(
    slug,
    requestedLocale,
  );

  const [completedCount, completedUsers, viewerUnlocked, viewerSessionStatus] =
    await Promise.all([
      (async () => {
        try {
          const countsForProjectList =
            await prisma.projectsChallengeSession.groupBy({
              _count: true,
              by: ['slug'],
              where: {
                slug,
                status: 'COMPLETED',
              },
            });

          return countsForProjectList[0]._count;
        } catch (_err) {
          return null;
        }
      })(),
      (async () => {
        try {
          const completedSessions =
            await prisma.projectsChallengeSession.findMany({
              distinct: ['profileId'],
              include: {
                projectsProfile: {
                  include: {
                    userProfile: {
                      select: {
                        avatarUrl: true,
                        id: true,
                        name: true,
                        username: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 4,
              where: {
                slug,
                status: 'COMPLETED',
              },
            });

          return completedSessions.map(
            (session) => session.projectsProfile!.userProfile!,
          );
        } catch (_err) {
          return [];
        }
      })(),
      (async () => {
        if (userId == null) {
          return false;
        }

        const accessForViewer = await prisma.projectsChallengeAccess.findFirst({
          where: {
            projectsProfile: {
              userProfile: {
                id: userId,
              },
            },
            slug,
          },
        });

        return accessForViewer != null;
      })(),
      (async () => {
        if (userId == null) {
          return null;
        }

        const latestSession = await prisma.projectsChallengeSession.findFirst({
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            projectsProfile: {
              userProfile: {
                id: userId,
              },
            },
            slug,
            status: {
              not: 'STOPPED',
            },
          },
        });

        return latestSession?.status ?? null;
      })(),
    ]);

  return {
    challenge: challengeItemAddTrackMetadata({
      completedCount,
      completedProfiles: completedUsers,
      metadata: challengeMetadata,
      status: viewerSessionStatus,
      userUnlocked: viewerUnlocked,
    }),
    loadedLocale: requestedLocale,
  };
}

export function challengeItemAddTrackMetadata(
  challengeItem: Omit<ProjectsChallengeItem, 'track'>,
): ProjectsChallengeItem {
  return {
    ...challengeItem,
    track: (() => {
      const trackItem = allProjectsTrackMetadata.find(
        (trackMetadata) => trackMetadata.slug === challengeItem.metadata.track,
      )!;

      return {
        href: trackItem.href,
        slug: trackItem.slug,
        title: trackItem.title,
      };
    })(),
  };
}

// TODO(projects): memoize the results to improve performance.
export async function readProjectsChallengeMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    challengeMetadata: ProjectsChallengeMetadata;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');
  const challengeMetadata = allProjectsChallengeMetadata.find(
    (challengeItem) =>
      challengeItem.slug === slug &&
      challengeItem._raw.flattenedPath.endsWith(requestedLocale),
  )!;

  return {
    challengeMetadata,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeStyleGuide(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    styleGuide: ProjectsChallengeStyleGuide | null;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const styleGuide =
    allProjectsChallengeStyleGuides.find(
      (styleGuideItem) =>
        styleGuideItem._raw.flattenedPath ===
        `projects/challenges/${slug}/style-guide/${requestedLocale}`,
    ) ?? null;

  return {
    loadedLocale: requestedLocale,
    styleGuide,
  };
}

export async function readProjectsChallengeAPIWriteup(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    apiWriteup: ProjectsChallengeAPIWriteup | null;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const apiWriteup =
    allProjectsChallengeAPIWriteups.find(
      (styleGuideItem) =>
        styleGuideItem._raw.flattenedPath ===
        `projects/challenges/${slug}/api/${requestedLocale}`,
    ) ?? null;

  return {
    apiWriteup,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeResourceGuideList(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    resourceProjectsChallengeGuides: Array<ProjectsChallengeGuide>;
  }>
> {
  const resourceProjectsChallengeGuides = allProjectsChallengeGuides.filter(
    (resourceGuideItem) =>
      resourceGuideItem._raw.flattenedPath.endsWith(requestedLocale),
  );

  return {
    loadedLocale: requestedLocale,
    resourceProjectsChallengeGuides,
  };
}
