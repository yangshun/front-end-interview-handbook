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

import type { ProjectsProjectSessionStatus } from '@prisma/client';

// TODO(projects): remove in future.
export const exampleProject: Omit<ProjectsProjectItem, 'metadata'> = {
  completedCount: null,
  completedUsers: [
    {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '123',
      linkedInUsername: null,
      name: 'John Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'johnsmith',
      website: null,
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '124',
      linkedInUsername: null,
      name: 'Jane Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'janesmith',
      website: null,
    },
    {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '125',
      linkedInUsername: null,
      name: 'Gina Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'ginasmith',
      website: null,
    },
  ],
  status: null,
};

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
          ProjectsProjectSessionStatus
        > = {};

        const sessionsForUser = await prisma.projectsProjectSession.findMany({
          orderBy: {
            createdAt: 'asc',
          },
          where: {
            profile: {
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
            await prisma.projectsProjectSession.groupBy({
              _count: true,
              by: ['slug', 'profileId'],
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
    .map((projectMetadata) => ({
      ...exampleProject,
      completedCount: countsGroupedBySlug?.[projectMetadata.slug] ?? null,
      metadata: {
        ...projectMetadata,
        ...extraProjectData,
      },
      status: sessionsForUserGroupedBySlug?.[projectMetadata.slug] ?? null,
    }));

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

  const [completedCount] = await Promise.all([
    (async () => {
      try {
        const countsForProjectList =
          await prisma.projectsProjectSession.groupBy({
            _count: true,
            by: ['slug', 'profileId'],
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
  ]);

  return {
    loadedLocale: requestedLocale,
    project: {
      ...exampleProject,
      completedCount,
      metadata: {
        ...projectMetadata,
        ...extraProjectData,
      },
    },
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
