import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsDashboardLayout from '~/components/projects/dashboard/ProjectsDashboardLayout';
import { getOrCreateUserProfileWithProjectsProfile } from '~/components/projects/utils/ProjectsProfileUtils';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await redirectToLoginPageIfNotLoggedIn('/projects/dashboard');

  await getOrCreateUserProfileWithProjectsProfile(viewer);

  return (
    <ProjectsDashboardLayout viewer={viewer}>
      {children}
    </ProjectsDashboardLayout>
  );
}
