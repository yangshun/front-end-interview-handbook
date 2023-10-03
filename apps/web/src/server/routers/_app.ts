import { devRouter } from './dev';
import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { purchasesRouter } from './purchases';
import { questionListsRouter } from './question-lists';
import { questionProgressRouter } from './question-progress';
import { questionSubmissionRouter } from './question-submission';
import { questionsRouter } from './questions';
import { router } from '../trpc';

export const appRouter = router({
  dev: devRouter,
  feedback: feedbackRouter,
  marketing: marketingRouter,
  purchases: purchasesRouter,
  questionLists: questionListsRouter,
  questionProgress: questionProgressRouter,
  questionSubmission: questionSubmissionRouter,
  questions: questionsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
