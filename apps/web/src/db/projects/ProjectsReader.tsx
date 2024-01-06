import type {
  ProjectAPIWriteup,
  ProjectStyleGuide,
} from 'contentlayer/generated';
import {
  allProjectAPIWriteups,
  allProjectMetadata,
  allProjectStyleGuides,
  allProjectTrackMetadata,
} from 'contentlayer/generated';

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
export const exampleTrack: Omit<ProjectsTrack, 'metadata'> = {
  completedProjectCount: 3,
  isPremium: false,
  points: 1000,
  projects: [
    {
      href: '/projects/p/button',
      slug: 'button',
      title: 'Button',
    },
    {
      href: '/projects/p/text-input',
      slug: 'text-input',
      title: 'Text Input',
    },
    {
      href: '/projects/p/alert',
      slug: 'alert',
      title: 'Alert',
    },
  ],
};

// TODO(projects): remove in future.
const extraData = {
  imgSrc: 'https://source.unsplash.com/random/960x360',
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
        ...extraData,
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
        ...extraData,
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
  const tracks = allProjectTrackMetadata
    .filter((trackMetadata) =>
      trackMetadata._raw.flattenedPath.endsWith(requestedLocale),
    )
    .map((trackMetadata) => ({
      ...exampleTrack,
      metadata: trackMetadata,
    }));

  return {
    loadedLocale: requestedLocale,
    tracks,
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
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const trackMetadata = allProjectTrackMetadata.find(
    (trackItem) =>
      trackItem._raw.flattenedPath ===
      `projects/tracks/${slug}/${requestedLocale}`,
  )!;

  return {
    loadedLocale: requestedLocale,
    track: {
      ...exampleTrack,
      metadata: trackMetadata,
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
