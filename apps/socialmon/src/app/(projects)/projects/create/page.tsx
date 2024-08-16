import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getUser } from '~/app/lib/auth';

import ProjectCreatePage from './ProejctCreatePage';

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
