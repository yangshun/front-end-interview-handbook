import { fetchUser } from '~/supabase/SupabaseServerGFE';

import SidebarLayout from './SidebarLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const user = await fetchUser();

  return <SidebarLayout user={user}>{children}</SidebarLayout>;
}
