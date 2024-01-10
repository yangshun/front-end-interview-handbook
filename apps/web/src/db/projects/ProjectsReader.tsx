import type {
  ProjectAPIWriteup,
  ProjectGuide,
  ProjectMetadata,
  ProjectStyleGuide,
  ProjectTrackMetadata,
} from 'contentlayer/generated';
import {
  allProjectAPIWriteups,
  allProjectGuides,
  allProjectMetadata,
  allProjectStyleGuides,
  allProjectTrackMetadata,
} from 'contentlayer/generated';
import { sum } from 'lodash-es';

import type { ProjectsProjectItem } from '~/components/projects/details/types';
import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';

import prisma from '~/server/prisma';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

// TODO(projects): remove in future.
const extraProjectData = {
  skills: [
    {
      difficulty: 'hard',
      key: 'react',
      label: 'React',
    },
    {
      difficulty: 'easy',
      key: 'html',
      label: 'HTML',
    },
    {
      difficulty: 'medium',
      key: 'js',
      label: 'JS',
    },
  ] as const,
} as const;

// TODO(projects): remove in future.
export const exampleTrack: Omit<
  ProjectsTrack,
  'metadata' | 'points' | 'projects'
> = {
  completedProjectCount: 3,
  isPremium: true,
};

export async function readProjectsProjectList(
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<{
  loadedLocale: string;
  projects: ReadonlyArray<ProjectsProjectItem>;
}> {
  const [sessionsForUserGroupedBySlug, countsGroupedBySlug] = await Promise.all(
    [
      (async () => {
        if (userId == null) {
          return null;
        }

        const sessionsForUserGrouped: Record<
          string,
          ProjectsChallengeSessionStatus
        > = {};

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
      })(),
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
    ],
  );

  const projects = allProjectMetadata
    .filter((projectItem) =>
      projectItem._raw.flattenedPath.endsWith(requestedLocale),
    )
    .map((projectMetadata) =>
      projectItemAddTrackMetadata({
        completedCount: countsGroupedBySlug?.[projectMetadata.slug] ?? null,
        // TODO(projects): Fetch from db.
        completedProfiles: [],
        metadata: {
          ...projectMetadata,
          ...extraProjectData,
        },
        status: sessionsForUserGroupedBySlug?.[projectMetadata.slug] ?? null,
      }),
    );

  return {
    loadedLocale: requestedLocale,
    projects,
  };
}

export async function readProjectsProjectItem(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    project: ProjectsProjectItem;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const { projectMetadata } = await readProjectsProjectMetadata(
    slug,
    requestedLocale,
  );

  const [completedCount, completedUsers] = await Promise.all([
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
  ]);

  return {
    loadedLocale: requestedLocale,
    project: projectItemAddTrackMetadata({
      completedCount,
      completedProfiles: completedUsers,
      metadata: {
        ...projectMetadata,
        ...extraProjectData,
      },
      // If any page needs it in future, fetch from db.
      status: null,
    }),
  };
}

function projectItemAddTrackMetadata(
  projectItem: Omit<ProjectsProjectItem, 'track'>,
): ProjectsProjectItem {
  return {
    ...projectItem,
    track: (() => {
      const trackItem = allProjectTrackMetadata.find(
        (trackMetadata) => trackMetadata.slug === projectItem.metadata.track,
      )!;

      return {
        href: trackItem.href,
        slug: trackItem.slug,
        title: trackItem.title,
      };
    })(),
  };
}

async function readProjectsProjectMetadata(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    projectMetadata: ProjectMetadata;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');
  const projectMetadata = allProjectMetadata.find(
    (projectItem) =>
      projectItem._raw.flattenedPath ===
      `projects/project/${slug}/${requestedLocale}`,
  )!;

  return {
    loadedLocale: requestedLocale,
    projectMetadata,
  };
}

export async function readProjectsTrackList(
  requestedLocale = 'en-US',
  userId?: string | null,
): Promise<{
  loadedLocale: string;
  tracks: ReadonlyArray<ProjectsTrack>;
}> {
  const [{ projects }, { trackMetadataList }] = await Promise.all([
    readProjectsProjectList(requestedLocale, userId),
    readProjectsTrackMetadataList(requestedLocale),
  ]);

  const tracks = trackMetadataList.map((trackMetadata) => {
    const trackProjects = projects
      .filter((project) => project.metadata.track === trackMetadata.slug)
      .map((project) => project.metadata);
    const points = sum(trackProjects.map((metadata) => metadata.points));

    return {
      ...exampleTrack,
      metadata: trackMetadata,
      points,
      projects: trackProjects,
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
  trackMetadataList: ReadonlyArray<ProjectTrackMetadata>;
}> {
  return {
    loadedLocale: requestedLocale,
    trackMetadataList: allProjectTrackMetadata.filter((trackMetadata) =>
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
    track: ProjectsTrack;
  }>
> {
  const { projects } = await readProjectsProjectList(requestedLocale);

  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const { trackMetadataList } =
    await readProjectsTrackMetadataList(requestedLocale);

  const trackMetadata = trackMetadataList.find(
    (trackMetadataItem) => trackMetadataItem.slug === slug,
  )!;

  const trackProjects = projects
    .filter((project) => project.metadata.track === trackMetadata.slug)
    .map((project) => project.metadata);
  const points = sum(trackProjects.map((metadata) => metadata.points));

  return {
    loadedLocale: requestedLocale,
    track: {
      ...exampleTrack,
      metadata: trackMetadata,
      points,
      projects: trackProjects,
    },
  };
}

export async function readProjectsProjectStyleGuide(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    styleGuide: ProjectStyleGuide | null;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const styleGuide =
    allProjectStyleGuides.find(
      (styleGuideItem) =>
        styleGuideItem._raw.flattenedPath ===
        `projects/project/${slug}/style-guide/${requestedLocale}`,
    ) ?? null;

  return {
    loadedLocale: requestedLocale,
    styleGuide,
  };
}

export async function readProjectsProjectAPIWriteup(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    apiWriteup: ProjectAPIWriteup | null;
    loadedLocale: string;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const apiWriteup =
    allProjectAPIWriteups.find(
      (styleGuideItem) =>
        styleGuideItem._raw.flattenedPath ===
        `projects/project/${slug}/api/${requestedLocale}`,
    ) ?? null;

  return {
    apiWriteup,
    loadedLocale: requestedLocale,
  };
}

export async function readProjectsProjectResourceGuideList(
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    resourceProjectGuides: Array<ProjectGuide>;
  }>
> {
  const resourceProjectGuides = allProjectGuides.filter((resourceGuideItem) =>
    resourceGuideItem._raw.flattenedPath.endsWith(requestedLocale),
  );

  return {
    loadedLocale: requestedLocale,
    resourceProjectGuides,
  };
}
