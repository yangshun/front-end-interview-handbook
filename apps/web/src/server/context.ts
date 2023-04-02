import { fetchUser } from '~/supabase/SupabaseServerGFE';

import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await fetchUser(req.cookies['supabase-auth-token']);

      return user;
    }

    return null;
  }

  const user = await getUserFromHeader();

  return {
    req,
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
