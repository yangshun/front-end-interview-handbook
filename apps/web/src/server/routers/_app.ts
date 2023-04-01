import { router } from '../trpc';

export const appRouter = router({});

// Export type definition of API
export type AppRouter = typeof appRouter;
