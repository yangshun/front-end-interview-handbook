import { allProjects } from 'contentlayer/generated';
import type { Metadata } from 'next';

import type { ProjectsProject } from '~/components/projects/projects/types';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import ProjectsAllProjects from './ProjectsAllProjects';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/projects/all',
    title: intl.formatMessage({
      defaultMessage: 'All | Projects',
      description: 'Title of Projects All Projects page',
      id: 'zJ76Ak',
    }),
  });
}

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
        full_name: 'John Smith',
      },
    },
  ],
  description: 'This is a short description for the newsletter section',
  href: '#',
  imgSrc: 'https://source.unsplash.com/random/960x360',
  isPremium: true,
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
  slug: 'newsletter-section',
  status: 'in-progress',
  title: 'Newsletter section',
  trackName: 'Design System Track',
};

export default async function ProjectsAllProjectsPage() {
  const projects = allProjects.map((projectItem) => ({
    ...exampleProject,
    ...projectItem,
  }));

  return <ProjectsAllProjects projects={projects} />;
}
