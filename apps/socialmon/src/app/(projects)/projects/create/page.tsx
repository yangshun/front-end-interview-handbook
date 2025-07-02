import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectCreatePage from '~/components/project/ProjectCreatePage';

import { getUser } from '~/app/lib/auth';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Create project',
};

export default async function Page() {
  const user = await getUser();

  if (!user?.isAdmin) {
    return notFound();
  }

  return <ProjectCreatePage />;
}
