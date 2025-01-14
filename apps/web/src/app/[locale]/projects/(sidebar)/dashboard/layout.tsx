import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsDashboardLayout from '~/components/projects/dashboard/ProjectsDashboardLayout';
import { redirectToProjectsOnboardingIfNoProjectsProfile } from '~/components/projects/utils/redirectToPathIfNoProjectsProfile';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await redirectToLoginPageIfNotLoggedIn('/projects/dashboard');

  await redirectToProjectsOnboardingIfNoProjectsProfile(viewer);

  return (
    <ProjectsDashboardLayout viewer={viewer}>
      {children}
    </ProjectsDashboardLayout>
  );
}
