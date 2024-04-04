import { redirect } from 'next/navigation';

import { FEATURE_FLAGS_PROJECTS_LAUNCHED } from '~/data/FeatureFlags';

import ProjectsRootLayout from '~/components/projects/common/layout/ProjectsRootLayout';

type Props = Readonly<{
  children: React.ReactElement;
}>;

export default async function Layout({ children }: Props) {
  if (!FEATURE_FLAGS_PROJECTS_LAUNCHED) {
    redirect('/');
  }

  return <ProjectsRootLayout>{children}</ProjectsRootLayout>;
}
