import { projectsChallengesRouter } from './challenges';
import { projectsProfileRouter } from './profile';
import { projectsSessionsRouter } from './sessions';
import { projectsChallengeSubmissionRouter } from './submissions';
import { router } from '../../trpc';

export const projectsRouter = router({
  challenges: projectsChallengesRouter,
  profile: projectsProfileRouter,
  sessions: projectsSessionsRouter,
  submissions: projectsChallengeSubmissionRouter,
});
