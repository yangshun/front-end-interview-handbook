import { fetchUser } from '~/supabase/SupabaseServerGFE';

import ProjectsSidebarLayout from './ProjectsSidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const user = await fetchUser();

  return <ProjectsSidebarLayout user={user}>{children}</ProjectsSidebarLayout>;
}
