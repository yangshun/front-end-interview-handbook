import { authRouter } from './auth';
import { commentsRouter } from './comments';
import { devRouter } from './dev';
import { feedbackRouter } from './feedback';
import { marketingRouter } from './marketing';
import { profileRouter } from './profile';
import { projectsRouter } from './projects';
import { purchasesRouter } from './purchases';
import { questionCommunitySolutionRouter } from './question-community-solution';
import { questionListsRouter } from './question-lists';
import { questionProgressRouter } from './question-progress';
import { questionSaveRouter } from './question-save';
import { questionSubmissionRouter } from './question-submission';
import { questionsRouter } from './questions';
import { rewardsRouter } from './rewards';
import { router } from '../trpc';

export const appRouter = router({
  auth: authRouter,
  comments: commentsRouter,
  dev: devRouter,
  feedback: feedbackRouter,
  marketing: marketingRouter,
  profile: profileRouter,
  projects: projectsRouter,
  purchases: purchasesRouter,
  questionCommunitySolution: questionCommunitySolutionRouter,
  questionLists: questionListsRouter,
  questionProgress: questionProgressRouter,
  questionSave: questionSaveRouter,
  questionSubmission: questionSubmissionRouter,
  questions: questionsRouter,
  rewards: rewardsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
