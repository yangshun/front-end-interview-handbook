import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

import parseI18nPathname from '~/next-i18nostic/src/utils/parseI18nPathname';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const viewer = await readViewerFromToken(req.cookies['supabase-auth-token']);

  const { referer } = req.headers;
  let currentLocale = 'en-US';

  if (referer) {
    try {
      const url = new URL(referer);
      const { locale } = parseI18nPathname(url.pathname);

      currentLocale = locale ?? 'en-US';
    } catch (err) {
      // Fallback to default
    }
  }

  return {
    locale: currentLocale,
    req,
    res,
    viewer,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
