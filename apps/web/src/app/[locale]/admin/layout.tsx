import { notFound, redirect } from 'next/navigation';
import url from 'node:url';

import { ADMIN_EMAILS } from '~/data/AdminConfig';

import AdminNavbar from '~/components/admin/AdminNavbar';
import AdminNavbarEnd from '~/components/admin/AdminNavbarEnd';
import AdminSidebarContainer from '~/components/admin/AdminSidebarContainer';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function AdminLayout({ children }: Props) {
  const userProfile = await readViewerFromToken();

  if (userProfile == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/admin/sponsorships',
        },
      }),
    );
  }

  if (!ADMIN_EMAILS.includes(userProfile.email)) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminNavbar hideOnDesktop={true} />
      <div className="grow">
        <div className="flex">
          <AdminSidebarContainer />
          <div className="relative w-0 grow">
            <AdminNavbarEnd />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
