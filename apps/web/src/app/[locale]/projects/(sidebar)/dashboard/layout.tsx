import ProjectsDashboardPage from '~/components/projects/dashboard/ProjectsDashboardPage';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await readViewerFromToken();

  return (
    <ProjectsDashboardPage viewer={viewer}>{children}</ProjectsDashboardPage>
  );
}
