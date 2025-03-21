import { authRouter } from './auth';
import { devRouter } from './dev';
import { emailsRouter } from './emails';
import { feedbackRouter } from './feedback';
import { guideProgressRouter } from './guide-progress';
import { marketingRouter } from './marketing';
import { profileRouter } from './profile';
import { projectsRouter } from './projects';
import { promotionsRouter } from './promotions';
import { purchasesRouter } from './purchases';
import { questionCommunitySolutionRouter } from './question-community-solution';
import { questionListsRouter } from './question-lists';
import { questionProgressRouter } from './question-progress';
import { questionSaveRouter } from './question-save';
import { questionSessionRouter } from './question-sessions';
import { questionSubmissionRouter } from './question-submission';
import { roadmapRouter } from './roadmap';
import { sponsorsRouter } from './sponsors';
import { router } from '../trpc';

export const appRouter = router({
  auth: authRouter,
  dev: devRouter,
  emails: emailsRouter,
  feedback: feedbackRouter,
  guideProgress: guideProgressRouter,
  marketing: marketingRouter,
  profile: profileRouter,
  projects: projectsRouter,
  promotions: promotionsRouter,
  purchases: purchasesRouter,
  questionCommunitySolution: questionCommunitySolutionRouter,
  questionLists: questionListsRouter,
  questionProgress: questionProgressRouter,
  questionSave: questionSaveRouter,
  questionSessions: questionSessionRouter,
  questionSubmission: questionSubmissionRouter,
  roadmap: roadmapRouter,
  sponsors: sponsorsRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
