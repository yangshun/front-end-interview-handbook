import { allProjects } from 'contentlayer/generated';

import type { ProjectsProject } from '~/components/projects/projects/types';

import ProjectsProjectBriefPage from './ProjectsProjectBriefPage';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

const exampleProject: ProjectsProject = {
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
        full_name: 'Jane Smith',
      },
    },
  ],
  description: 'This is a short description for the newsletter section',
  imgSrc: 'https://source.unsplash.com/random/960x360',
  isPremium: false,
  isStarter: true,
  projectHref: '#',
  repCount: 1000,
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
  slug: 'newsletter-section-1',
  status: 'in-progress',
  title: 'Newsletter section',
  trackName: 'Design System Track',
};

export default function Page({ params }: Props) {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');

  const project = allProjects.find(
    (projectItem) =>
      projectItem._raw.flattenedPath === `projects/${slug}/${locale}`,
  )!;

  const fetchedProject = { ...exampleProject, ...project };

  return <ProjectsProjectBriefPage project={fetchedProject} />;
}
