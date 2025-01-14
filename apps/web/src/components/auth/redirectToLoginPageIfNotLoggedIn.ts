import 'server-only';

import { redirect } from 'next/navigation';
import url from 'node:url';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function redirectToLoginPageIfNotLoggedIn(next: string) {
  const viewer = await readViewerFromToken();

  if (viewer != null) {
    return viewer;
  }

  return redirect(
    url.format({
      pathname: '/login',
      query: {
        next,
      },
    }),
  );
}
