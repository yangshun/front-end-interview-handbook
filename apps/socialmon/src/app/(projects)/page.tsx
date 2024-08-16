import type { Metadata } from 'next';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';

import { getUser } from '~/app/lib/auth';

import ProjectsPage from './ProjectsPage';

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Projects',
};

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/');

  const user = await getUser();

  const isAdminRole = user?.isAdmin;

  return <ProjectsPage isAdminRole={!!isAdminRole} />;
}
