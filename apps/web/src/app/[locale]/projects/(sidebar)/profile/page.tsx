import { redirect } from 'next/navigation';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import { redirectToPathIfNoProjectsProfile } from '~/components/projects/utils/redirectToPathIfNoProjectsProfile';

// This page is just for redirecting a logged-in user to their profile homepage.
export default async function Page() {
  const viewer = await redirectToLoginPageIfNotLoggedIn('/projects/profile');
  const viewerProfile = await redirectToPathIfNoProjectsProfile(
    viewer,
    '/projects/challenges',
  );

  return redirect(`/projects/u/${viewerProfile.username}`);
}
