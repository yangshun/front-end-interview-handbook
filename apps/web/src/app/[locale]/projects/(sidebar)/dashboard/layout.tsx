import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsDashboardLayout from '~/components/projects/dashboard/ProjectsDashboardLayout';
import { getOrCreateUserProfileWithProjectsProfile } from '~/components/projects/utils/ProjectsProfileUtils';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const { locale } = params;
  const viewer = await redirectToLoginPageIfNotLoggedIn(
    '/projects/dashboard',
    locale,
  );

  await getOrCreateUserProfileWithProjectsProfile(viewer);

  return (
    <ProjectsDashboardLayout viewer={viewer}>
      {children}
    </ProjectsDashboardLayout>
  );
}
