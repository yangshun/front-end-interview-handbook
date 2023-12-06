import { greetingRouter } from './greeting';
import { router } from '../trpc';

export const appRouter = router({
  greeting: greetingRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
