import ProjectsSideBar from '~/components/projects/layout/ProjectsSidebar';

import { fetchUser } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function SidebarLayout({ children }: Props) {
  const user = await fetchUser();

  return (
    <div className="flex">
      <div className="w-[240px] overflow-y-hidden">
        <ProjectsSideBar
          user={
            user !== null
              ? {
                  jobTitle: 'Software Engineer',
                  userName: user.email ?? 'Unknown',
                }
              : null
          }
        />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
