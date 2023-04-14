import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { questionProgressRouter } from './question-progress';
import { router } from '../trpc';

export const appRouter = router({
  feedback: feedbackRouter,
  marketing: marketingRouter,
  questionProgress: questionProgressRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
