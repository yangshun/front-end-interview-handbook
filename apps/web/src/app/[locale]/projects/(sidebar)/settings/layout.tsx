import type { ReactNode } from 'react';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsSettingsLayout from '~/components/projects/settings/ProjectsSettingsLayout';

type Props = Readonly<{
  children: ReactNode;
  params: Readonly<{
    locale: string;
  }>;
}>;

export default async function Layout({ children }: Props) {
  await redirectToLoginPageIfNotLoggedIn('/projects/settings');

  return <ProjectsSettingsLayout>{children}</ProjectsSettingsLayout>;
}
