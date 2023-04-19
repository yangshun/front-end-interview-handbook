import { devRouter } from './dev';
import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { purchasesRouter } from './purchases';
import { questionProgressRouter } from './question-progress';
import { questionsRouter } from './questions';
import { router } from '../trpc';

export const appRouter = router({
  dev: devRouter,
  feedback: feedbackRouter,
  marketing: marketingRouter,
  purchases: purchasesRouter,
  questionProgress: questionProgressRouter,
  questions: questionsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
