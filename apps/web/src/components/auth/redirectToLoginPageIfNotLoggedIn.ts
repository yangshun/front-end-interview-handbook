import 'server-only';

import url from 'node:url';

import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function redirectToLoginPageIfNotLoggedIn(
  next: string,
  locale: string,
) {
  const viewer = await readViewerFromToken();

  if (viewer != null) {
    return viewer;
  }

  return i18nRedirect(
    url.format({
      pathname: '/login',
      query: {
        next,
      },
    }),
    { locale },
  );
}
