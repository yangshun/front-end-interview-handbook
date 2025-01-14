import type { ReactNode } from 'react';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsSettingsLayout from '~/components/projects/settings/ProjectsSettingsLayout';
import { redirectToProjectsOnboardingIfNoProjectsProfile } from '~/components/projects/utils/redirectToPathIfNoProjectsProfile';

type Props = Readonly<{
  children: ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await redirectToLoginPageIfNotLoggedIn('/projects/settings');

  await redirectToProjectsOnboardingIfNoProjectsProfile(viewer);

  return <ProjectsSettingsLayout>{children}</ProjectsSettingsLayout>;
}
