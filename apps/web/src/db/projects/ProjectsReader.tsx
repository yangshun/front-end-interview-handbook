import { allProjects } from 'contentlayer/generated';

import type { ProjectsProject } from '~/components/projects/projects/types';

export const exampleProject: ProjectsProject = {
  completedCount: 21,
  completedUsers: [
    {
      app_metadata: {
        provider: 'auth0',
      },
      aud: '',
      created_at: '',
      email: 'example@abc.com',
      id: 'user1',
      user_metadata: {
        avatar_url: 'https://source.unsplash.com/random/48x48',
        full_name: 'John Smith',
      },
    },
    {
      app_metadata: {
        provider: 'auth0',
      },
      aud: '',
      created_at: '',
      email: 'example@abc.com',
      id: 'user2',
      user_metadata: {
        avatar_url: 'https://source.unsplash.com/random/48x48',
        full_name: 'John Smith',
      },
    },
  ],
  description: 'This is a short description for the newsletter section',
  href: '#',
  imgSrc: 'https://source.unsplash.com/random/960x360',
  isPremium: true,
  isStarter: true,
  points: 1000,
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
  ],
  slug: 'newsletter-section',
  status: 'in-progress',
  title: 'Newsletter section',
  trackName: 'Design System Track',
};

export async function readProjectsProjectList(
  requestedLocale = 'en-US',
): Promise<{ loadedLocale: string; projects: ReadonlyArray<ProjectsProject> }> {
  const projects = allProjects.map((projectItem) => ({
    ...exampleProject,
    ...projectItem,
  }));

  return {
    loadedLocale: requestedLocale,
    projects,
  };
}

export async function readProjectsProjectDetails(
  slugParam: string,
  requestedLocale = 'en-US',
): Promise<
  Readonly<{
    loadedLocale: string;
    project: ProjectsProject;
  }>
> {
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(slugParam).replaceAll(/[^a-zA-Z-]/g, '');

  const project = allProjects.find(
    (projectItem) =>
      projectItem._raw.flattenedPath === `projects/${slug}/${requestedLocale}`,
  )!;

  return {
    loadedLocale: requestedLocale,
    project: { ...exampleProject, ...project },
  };
}
