import type {
  ProjectsChallengeAPIWriteup,
  ProjectsChallengeAppendix,
  ProjectsChallengeGuide,
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
  ProjectsChallengeStyleGuide,
  ProjectsCommonGuide,
} from 'contentlayer/generated';
import fs from 'fs';
import path from 'path';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type {
  ProjectsChallengeSolutionBundle,
  ProjectsChallengeSolutionFrameworkType,
} from '~/components/projects/challenges/types';
import {
  readProjectsTrackInfo,
  readProjectsTrackMetadata,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import type { ProjectsProfileAvatarDataSlim } from '~/components/projects/types';

import { fetchProjectsChallengeAPIWriteup } from '~/db/contentlayer/projects/ProjectsChallengeAPIWriteupReader';
import { fetchProjectsChallengeAppendixes } from '~/db/contentlayer/projects/ProjectsChallengeAppendixesReader';
import { fetchProjectsChallengeGuide } from '~/db/contentlayer/projects/ProjectsChallengeGuideReader';
import {
  fetchAllProjectsChallengeInfo,
  fetchProjectsChallengeInfo,
} from '~/db/contentlayer/projects/ProjectsChallengeInfoReader';
import {
  fetchAllProjectsChallengeMetadata,
  fetchProjectsChallengeMetadata,
} from '~/db/contentlayer/projects/ProjectsChallengeMetadataReader';
import { fetchProjectsChallengeStyleGuide } from '~/db/contentlayer/projects/ProjectsChallengeStyleGuideReader';
import { fetchAllProjectsCommonGuides } from '~/db/contentlayer/projects/ProjectsCommonGuideReader';
import prisma from '~/server/prisma';

import { getChallengeSolutionsOutPath } from './ProjectsChallengeSolutionConfig';

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
    startedCountsGroupedBySlug,
    startedProfileIdsGroupedBySlug,
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
              status: {
                in: ['COMPLETED', 'IN_PROGRESS'],
              },
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
            AND p_inner."status" IN ('COMPLETED', 'IN_PROGRESS')
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

  const [{ challengeInfoDict }, allChallengeMetadata] = await Promise.all([
    readProjectsChallengeInfoDict(requestedLocale),
    fetchAllProjectsChallengeMetadata(),
  ]);

  const challenges = await Promise.all(
    allChallengeMetadata.map(
      async (challengeMetadata) =>
        await challengeItemAddTrackMetadata(
          {
            info: challengeInfoDict[challengeMetadata.slug],
            metadata: challengeMetadata,
            startedCount:
              startedCountsGroupedBySlug?.[challengeMetadata.slug] ?? null,
            startedProfiles:
              startedProfileIdsGroupedBySlug?.[challengeMetadata.slug] ?? [],
            status:
              sessionsForUserGroupedBySlug?.[challengeMetadata.slug] ?? null,
            userUnlocked:
              challengeAccessSet?.has(challengeMetadata.slug) ?? null,
          },
          requestedLocale,
        ),
    ),
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
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const [challengeMetadata, { challengeInfo }] = await Promise.all([
    readProjectsChallengeMetadata(slug),
    readProjectsChallengeInfo(slug, requestedLocale),
  ]);

  const [startedCount, startedUsers, viewerUnlocked, viewerSessionStatus] =
    await Promise.all([
      (async () => {
        try {
          const countsForProjectList =
            await prisma.projectsChallengeSession.groupBy({
              _count: true,
              by: ['slug'],
              where: {
                slug,
                status: {
                  in: ['COMPLETED', 'IN_PROGRESS'],
                },
              },
            });

          return countsForProjectList[0]._count;
        } catch (_err) {
          return null;
        }
      })(),
      (async () => {
        try {
          const startedSessions =
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
                status: {
                  in: ['COMPLETED', 'IN_PROGRESS'],
                },
              },
            });

          return startedSessions.map(
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
  const challenge = await challengeItemAddTrackMetadata(
    {
      info: challengeInfo,
      metadata: challengeMetadata,
      startedCount,
      startedProfiles: startedUsers,
      status: viewerSessionStatus,
      userUnlocked: viewerUnlocked,
    },
    requestedLocale,
  );

  return {
    challenge,
    loadedLocale: requestedLocale,
  };
}

export async function challengeItemAddTrackMetadata(
  challengeItem: Omit<ProjectsChallengeItem, 'track'>,
  requestedLocale = 'en-US',
): Promise<ProjectsChallengeItem> {
  const [{ trackMetadata }, { trackInfo }] = await Promise.all([
    readProjectsTrackMetadata(challengeItem.metadata.track, requestedLocale),
    readProjectsTrackInfo(challengeItem.metadata.track, requestedLocale),
  ]);

  return {
    ...challengeItem,
    track: {
      href: trackMetadata.href,
      slug: trackMetadata.slug,
      title: trackInfo.title,
    },
  };
}

// TODO(projects): memoize the results to improve performance.
export async function readProjectsChallengeMetadata(
  slugParam: string,
): Promise<ProjectsChallengeMetadata> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const challengeMetadata = await fetchProjectsChallengeMetadata(slug);

  return challengeMetadata!;
}

export async function readProjectsChallengeInfo(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    challengeInfo: ProjectsChallengeInfo;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();
  const challengeInfo = await fetchProjectsChallengeInfo(slug, requestedLocale);

  return {
    challengeInfo: challengeInfo!,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeInfoList(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    challengeInfoList: ReadonlyArray<ProjectsChallengeInfo>;
    loadedLocale: string;
  }>
> {
  const allChallengeInfo = await fetchAllProjectsChallengeInfo();
  const challengeInfoList = allChallengeInfo.filter(
    (challengeInfoItem) => challengeInfoItem.locale === requestedLocale,
  );

  return {
    challengeInfoList,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeMetadataDict(): Promise<
  Record<string, ProjectsChallengeMetadata>
> {
  const allChallengeMetadata = await fetchAllProjectsChallengeMetadata();

  return allChallengeMetadata.reduce(
    (prev, metadata) => ({
      ...prev,
      [metadata.slug]: metadata,
    }),
    {},
  );
}

export async function readProjectsChallengeInfoDict(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    challengeInfoDict: Record<string, ProjectsChallengeInfo>;
    loadedLocale: string;
  }>
> {
  const { challengeInfoList } = await readProjectsChallengeInfoList();
  const challengeInfoDict: Record<string, ProjectsChallengeInfo> =
    challengeInfoList.reduce(
      (prev, infoItem) => ({
        ...prev,
        [infoItem.slug]: infoItem,
      }),
      {},
    );

  return {
    challengeInfoDict,
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
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const styleGuide = await fetchProjectsChallengeStyleGuide(
    slug,
    requestedLocale,
  );

  return {
    loadedLocale: requestedLocale,
    styleGuide: styleGuide ?? null,
  };
}

export async function readProjectsChallengeAppendix(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    appendix: ProjectsChallengeAppendix | null;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const appendix = await fetchProjectsChallengeAppendixes(
    slug,
    requestedLocale,
  );

  return {
    appendix: appendix ?? null,
    loadedLocale: requestedLocale,
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
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const apiWriteup = await fetchProjectsChallengeAPIWriteup(
    slug,
    requestedLocale,
  );

  return {
    apiWriteup: apiWriteup ?? null,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeGuide(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    challengeGuide: ProjectsChallengeGuide | null;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam)
    .replaceAll(/[^\da-zA-Z-]/g, '')
    .toLowerCase();

  const challengeGuide = await fetchProjectsChallengeGuide(
    slug,
    requestedLocale,
  );

  return {
    challengeGuide: challengeGuide ?? null,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsCommonGuideList(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    commonGuides: Array<ProjectsCommonGuide>;
    loadedLocale: string;
  }>
> {
  const commonGuides = await fetchAllProjectsCommonGuides();
  const filteredCommonGuides = commonGuides.filter((commonGuideItem) =>
    commonGuideItem._raw.flattenedPath.endsWith(requestedLocale),
  );

  return {
    commonGuides: filteredCommonGuides,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengeSolutions(
  slug: string,
  solutionFrameworkParam?: ProjectsChallengeSolutionFrameworkType | null,
): Promise<ProjectsChallengeSolutionBundle> {
  const challengeSolutionsOutDir = getChallengeSolutionsOutPath(slug);

  const solutionFramework = solutionFrameworkParam ?? 'vanilla';

  const solutionBundle = (() => {
    const response = fs.readFileSync(
      path.join(challengeSolutionsOutDir, `${solutionFramework}.json`),
    );

    return JSON.parse(String(response)) as ProjectsChallengeSolutionBundle;
  })();

  return solutionBundle;
}
