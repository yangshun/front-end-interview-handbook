import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const user = readUserFromToken(req.cookies['supabase-auth-token']);

  return {
    req,
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
