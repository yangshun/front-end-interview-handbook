import { allProjects } from 'contentlayer/generated';

import type { ProjectsProjectMetadata } from '~/components/projects/projects/types';

// TODO(projects): remove in future.
export const exampleProject: ProjectsProjectMetadata = {
  access: 'free',
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
  description: 'This is a short description for the newsletter section',
  difficulty: 'starter',
  href: '#',
  imgSrc: 'https://source.unsplash.com/random/960x360',
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
  submitHref: '#',
  title: 'Newsletter section',
  trackName: 'Design System Track',
};

export async function readProjectsProjectList(
  requestedLocale = 'en-US',
): Promise<{
  loadedLocale: string;
  projects: ReadonlyArray<ProjectsProjectMetadata>;
}> {
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
    project: ProjectsProjectMetadata;
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
