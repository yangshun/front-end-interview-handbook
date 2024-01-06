import type {
  ProjectAPIWriteup,
  ProjectStyleGuide,
  ProjectTrackMetadata,
} from 'contentlayer/generated';
import {
  allProjectAPIWriteups,
  allProjectMetadata,
  allProjectStyleGuides,
  allProjectTrackMetadata,
} from 'contentlayer/generated';
import { sum } from 'lodash-es';

import type { ProjectsProjectItem } from '~/components/projects/details/types';
import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';

// TODO(projects): remove in future.
export const exampleProject: Omit<ProjectsProjectItem, 'metadata'> = {
  completedCount: 21,
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
  status: 'in-progress',
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
): Promise<{
  loadedLocale: string;
  projects: ReadonlyArray<ProjectsProjectItem>;
}> {
  const projects = allProjectMetadata
    .filter((projectItem) =>
      projectItem._raw.flattenedPath.endsWith(requestedLocale),
    )
    .map((projectMetadata) => ({
      ...exampleProject,
      metadata: {
        ...projectMetadata,
        ...extraProjectData,
      },
    }));

  return {
    loadedLocale: requestedLocale,
    projects,
  };
}

export async function readProjectsProjectMetadata(
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

  const project = allProjectMetadata.find(
    (projectItem) =>
      projectItem._raw.flattenedPath ===
      `projects/project/${slug}/${requestedLocale}`,
  )!;

  return {
    loadedLocale: requestedLocale,
    project: {
      ...exampleProject,
      metadata: {
        ...project,
        ...extraProjectData,
      },
    },
  };
}

export async function readProjectsTrackList(
  requestedLocale = 'en-US',
): Promise<{
  loadedLocale: string;
  tracks: ReadonlyArray<ProjectsTrack>;
}> {
  const [{ projects }, { trackMetadataList }] = await Promise.all([
    readProjectsProjectList(requestedLocale),
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
