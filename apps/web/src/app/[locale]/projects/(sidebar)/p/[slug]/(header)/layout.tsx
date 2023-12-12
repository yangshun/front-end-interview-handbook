import { allProjects } from 'contentlayer/generated';

import ProjectsProjectHeaderLayout from '~/components/projects/layout/ProjectsPage/ProjectsProjectHeaderLayout';
import type { ProjectsProject } from '~/components/projects/projects/types';

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
  href: '#',
  imgSrc: 'https://source.unsplash.com/random/960x360',
  isPremium: false,
  isStarter: true,
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

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale, slug: rawSlug } = params;
  // So that we handle typos like extra characters.
  const slug = decodeURIComponent(rawSlug).replaceAll(/[^a-zA-Z-]/g, '');

  const project = allProjects.find(
    (projectItem) =>
      projectItem._raw.flattenedPath === `projects/${slug}/${locale}`,
  )!;

  const fetchedProject = { ...exampleProject, ...project };

  return (
    <ProjectsProjectHeaderLayout project={fetchedProject}>
      {children}
    </ProjectsProjectHeaderLayout>
  );
}
