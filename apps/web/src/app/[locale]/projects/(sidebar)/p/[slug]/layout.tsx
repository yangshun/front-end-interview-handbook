import ProjectsProjectHeaderLayout from '~/components/projects/layout/ProjectsPage/ProjectsProjectHeaderLayout';
import type { ProjectsProject } from '~/components/projects/projects/types';

import { fetchUser } from '~/supabase/SupabaseServerGFE';

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
  title: 'Newsletter section',
  trackName: 'Design System Track',
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return (
    <ProjectsProjectHeaderLayout project={exampleProject}>
      {children}
    </ProjectsProjectHeaderLayout>
  );
}
