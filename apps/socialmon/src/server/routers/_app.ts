import { socialAccountsRouter } from './social-accounts';
import { socialPostsRouter } from './social-posts';
import { router } from '../trpc';

export const appRouter = router({
  socialAccounts: socialAccountsRouter,
  socialPosts: socialPostsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
