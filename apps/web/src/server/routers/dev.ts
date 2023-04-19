import { publicProcedure, router } from '../trpc';

export const devRouter = router({
  serverCommit: publicProcedure.query(async () => {
    return process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '';
  }),
});
