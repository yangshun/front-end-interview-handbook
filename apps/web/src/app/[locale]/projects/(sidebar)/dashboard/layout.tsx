import ProjectsDashboardLayout from '~/components/projects/dashboard/ProjectsDashboardLayout';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await readViewerFromToken();

  return (
    <ProjectsDashboardLayout viewer={viewer}>
      {children}
    </ProjectsDashboardLayout>
  );
}
