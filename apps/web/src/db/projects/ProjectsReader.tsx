import type {
  ProjectsChallengeAPIWriteup,
  ProjectsChallengeGuide,
  ProjectsChallengeMetadata,
  ProjectsChallengeStyleGuide,
  ProjectsSkillMetadata,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';
import {
  allProjectsChallengeAPIWriteups,
  allProjectsChallengeGuides,
  allProjectsChallengeMetadata,
  allProjectsChallengeStyleGuides,
  allProjectsSkillMetadata,
  allProjectsTrackMetadata,
} from 'contentlayer/generated';
import { sum } from 'lodash-es';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type { ProjectsSkillKey } from '~/components/projects/skills/types';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
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

export async function fetchChallengeStatusForUserFilteredBySkillsGroupedBySlug(
  skillSlug: string,
  userId?: string | null,
): Promise<Record<string, ProjectsChallengeSessionStatus> | null> {
  if (userId == null) {
    return null;
  }

  const sessionsForUserGrouped: Record<string, ProjectsChallengeSessionStatus> =
    {};

  const [sessionsForUser, submissions] = await Promise.all([
    prisma.projectsChallengeSession.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      where: {
        projectsProfile: {
          userProfile: {
            id: userId,
          },
        },
        roadmapSkills: {
          has: skillSlug,
        },
        status: {
          not: 'STOPPED',
        },
      },
    }),
    prisma.projectsChallengeSubmission.findMany({
      distinct: ['slug'],
      where: {
        projectsProfile: {
          userId,
        },
        roadmapSkills: {
          has: skillSlug,
        },
      },
    }),
  ]);

  sessionsForUser?.forEach((session) => {
    sessionsForUserGrouped[session.slug] = session.status;
  });

  submissions.forEach((submission) => {
    sessionsForUserGrouped[submission.slug] = 'COMPLETED';
  });

  return sessionsForUserGrouped;
}

/**
 * For each skill, contains a map of challenge slug -> status.
 * Note that challenge slugs can be outside of the skill plan's
 * recommended challenges since any skill can be added to submissions.
 */
export async function fetchChallengeStatusForUserGroupedBySkills(
  userId?: string | null,
): Promise<
  Record<ProjectsSkillKey, Record<string, ProjectsChallengeSessionStatus>>
> {
  if (userId == null) {
    return {};
  }

  const skillsChallengeStatus: Record<
    ProjectsSkillKey,
    Record<string, ProjectsChallengeSessionStatus>
  > = {};

  const [sessionsForUser, submissions] = await Promise.all([
    prisma.projectsChallengeSession.findMany({
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
    }),
    prisma.projectsChallengeSubmission.findMany({
      distinct: ['slug'],
      where: {
        projectsProfile: {
          userId,
        },
      },
    }),
  ]);

  sessionsForUser?.forEach((session) => {
    session.roadmapSkills.forEach((skill) => {
      if (!skillsChallengeStatus[skill]) {
        skillsChallengeStatus[skill] = {};
      }

      skillsChallengeStatus[skill][session.slug] = session.status;
    });
  });

  submissions.forEach((submission) => {
    submission.roadmapSkills.forEach((skill) => {
      if (!skillsChallengeStatus[skill]) {
        skillsChallengeStatus[skill] = {};
      }

      skillsChallengeStatus[skill][submission.slug] = 'COMPLETED';
    });
  });

  return skillsChallengeStatus;
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
  viewerId?: string | null,
): Promise<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  loadedLocale: string;
}> {
  const [
    sessionsForUserGroupedBySlug,
    challengeAccessSet,
    countsGroupedBySlug,
    completedProfileIdsGroupedBySlug,
  ] = await Promise.all([
    fetchSessionsForUserGroupedBySlug(viewerId),
    fetchChallengeAccessForUserGroupedBySlug(viewerId),
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
        completedCount: countsGroupedBySlug?.[challengeMetadata.slug] ?? null,
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
  viewerId?: string | null,
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
        if (viewerId == null) {
          return false;
        }

        const accessForViewer = await prisma.projectsChallengeAccess.findFirst({
          where: {
            projectsProfile: {
              userProfile: {
                id: viewerId,
              },
            },
            slug,
          },
        });

        return accessForViewer != null;
      })(),
      (async () => {
        if (viewerId == null) {
          return null;
        }

        const latestSession = await prisma.projectsChallengeSession.findFirst({
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            projectsProfile: {
              userProfile: {
                id: viewerId,
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

function challengeItemAddTrackMetadata(
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
      challengeItem._raw.flattenedPath ===
      `projects/challenges/${slug}/${requestedLocale}`,
  )!;

  return {
    challengeMetadata,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsChallengesForSkill(
  slugParam: string,
  requestedLocale = 'en-US',
  viewerId?: string | null,
): Promise<
  Readonly<{
    challenges: ReadonlyArray<ProjectsChallengeItem>;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const [challengeStatuses, challengeAccessSet] = await Promise.all([
    fetchChallengeStatusForUserFilteredBySkillsGroupedBySlug(
      slugParam,
      viewerId,
    ),
    fetchChallengeAccessForUserGroupedBySlug(viewerId),
  ]);

  const challenges = allProjectsChallengeMetadata
    .filter((challengeItem) =>
      challengeItem._raw.flattenedPath.endsWith(requestedLocale),
    )
    .filter((challengeItem) => challengeItem.skills.includes(slug))
    .map((challengeMetadata) =>
      challengeItemAddTrackMetadata({
        completedCount: null,
        completedProfiles: [],
        metadata: challengeMetadata,
        status: challengeStatuses?.[challengeMetadata.slug] ?? null,
        userUnlocked: challengeAccessSet?.has(challengeMetadata.slug) ?? null,
      }),
    );

  return {
    challenges,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsSkillMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    skillMetadata: ProjectsSkillMetadata;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');
  const skillMetadata = allProjectsSkillMetadata.find(
    (skillItem) =>
      skillItem._raw.flattenedPath ===
      `projects/skills/${slug}/${requestedLocale}`,
  )!;

  return {
    loadedLocale: requestedLocale,
    skillMetadata,
  };
}

export async function readProjectsTrackList(
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<{
  loadedLocale: string;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}> {
  const [{ challenges }, { trackMetadataList }] = await Promise.all([
    readProjectsChallengeList(requestedLocale, userId),
    readProjectsTrackMetadataList(requestedLocale),
  ]);

  const tracks = trackMetadataList.map((trackMetadata) => {
    const trackChallenges = challenges
      .filter((challenge) => challenge.metadata.track === trackMetadata.slug)
      .map((challenge) => challenge.metadata);
    const points = sum(trackChallenges.map((metadata) => metadata.points));

    return {
      challenges: trackChallenges,
      metadata: trackMetadata,
      points,
    };
  });

  return {
    loadedLocale: requestedLocale,
    tracks,
  };
}

export async function readProjectsTrackMetadataList(
  requestedLocale = 'en-US',
): Promise<{
  loadedLocale: string;
  trackMetadataList: ReadonlyArray<ProjectsTrackMetadata>;
}> {
  return {
    loadedLocale: requestedLocale,
    trackMetadataList: allProjectsTrackMetadata.filter((trackMetadata) =>
      trackMetadata._raw.flattenedPath.endsWith(requestedLocale),
    ),
  };
}

export async function readProjectsTrack(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    track: ProjectsTrackItem;
  }>
> {
  const { challenges } = await readProjectsChallengeList(requestedLocale);

  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const { trackMetadataList } =
    await readProjectsTrackMetadataList(requestedLocale);

  const trackMetadata = trackMetadataList.find(
    (trackMetadataItem) => trackMetadataItem.slug === slug,
  )!;

  const trackChallenges = challenges
    .filter((challenge) => challenge.metadata.track === trackMetadata.slug)
    .map((challenge) => challenge.metadata);
  const points = sum(trackChallenges.map((metadata) => metadata.points));

  return {
    loadedLocale: requestedLocale,
    track: {
      challenges: trackChallenges,
      metadata: trackMetadata,
      points,
    },
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
