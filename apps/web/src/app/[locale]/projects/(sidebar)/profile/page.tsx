import { redirect } from 'next/navigation';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import { getOrCreateUserProfileWithProjectsProfile } from '~/components/projects/utils/ProjectsProfileUtils';

// This page is just for redirecting a logged-in user to their profile homepage.
export default async function Page() {
  const viewer = await redirectToLoginPageIfNotLoggedIn('/projects/profile');
  const viewerProfile = await getOrCreateUserProfileWithProjectsProfile(viewer);

  return redirect(`/projects/u/${viewerProfile.username}`);
}
