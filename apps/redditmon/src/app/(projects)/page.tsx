import type { Metadata } from 'next';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsPage from '~/components/project/ProjectsPage';

import { getUser } from '~/app/lib/auth';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'Redditmon | Projects',
};

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/');

  const user = await getUser();

  const isAdminRole = user?.isAdmin;

  return <ProjectsPage isAdminRole={!!isAdminRole} />;
}
