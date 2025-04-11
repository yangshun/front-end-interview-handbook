import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import { getOrCreateUserProfileWithProjectsProfile } from '~/components/projects/utils/ProjectsProfileUtils';

import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

// This page is just for redirecting a logged-in user to their profile homepage.
export default async function Page({ params }: Props) {
  const { locale } = params;
  const viewer = await redirectToLoginPageIfNotLoggedIn(
    '/projects/profile',
    locale,
  );
  const viewerProfile = await getOrCreateUserProfileWithProjectsProfile(viewer);

  return i18nRedirect(`/projects/u/${viewerProfile.username}`, { locale });
}
