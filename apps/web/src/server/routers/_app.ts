import { devRouter } from './dev';
import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { profileRouter } from './profile';
import { purchasesRouter } from './purchases';
import { questionCommunitySolutionRouter } from './question-community-solution';
import { questionListsRouter } from './question-lists';
import { questionProgressRouter } from './question-progress';
import { questionSaveRouter } from './question-save';
import { questionSubmissionRouter } from './question-submission';
import { questionsRouter } from './questions';
import { router } from '../trpc';

export const appRouter = router({
  dev: devRouter,
  feedback: feedbackRouter,
  marketing: marketingRouter,
  profile: profileRouter,
  purchases: purchasesRouter,
  questionCommunitySolution: questionCommunitySolutionRouter,
  questionLists: questionListsRouter,
  questionProgress: questionProgressRouter,
  questionSave: questionSaveRouter,
  questionSubmission: questionSubmissionRouter,
  questions: questionsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
