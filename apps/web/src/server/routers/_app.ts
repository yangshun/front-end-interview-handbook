import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { purchasesRouter } from './purchases';
import { questionProgressRouter } from './question-progress';
import { router } from '../trpc';

export const appRouter = router({
  feedback: feedbackRouter,
  marketing: marketingRouter,
  purchases: purchasesRouter,
  questionProgress: questionProgressRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
