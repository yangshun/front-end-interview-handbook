import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const viewer = await readViewerFromToken(req.cookies['supabase-auth-token']);

  return {
    req,
    viewer,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
