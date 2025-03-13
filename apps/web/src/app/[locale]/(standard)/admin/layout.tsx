import { notFound, redirect } from 'next/navigation';
import url from 'node:url';

import { ADMIN_EMAILS } from '~/data/AdminConfig';

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

  return children;
}
