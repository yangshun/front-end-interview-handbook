import { projectsChallengeRouter } from './challenge';
import { projectsChallengesRouter } from './challenges';
import { projectsCommentsRouter } from './comments';
import { projectsProfileRouter } from './profile';
import { projectsSessionsRouter } from './sessions';
import { projectsChallengeSubmissionItemRouter } from './submission';
import { projectsChallengeSubmissionListRouter } from './submissions';
import { router } from '../../trpc';

export const projectsRouter = router({
  challenge: projectsChallengeRouter,
  challenges: projectsChallengesRouter,
  comments: projectsCommentsRouter,
  profile: projectsProfileRouter,
  sessions: projectsSessionsRouter,
  submission: projectsChallengeSubmissionItemRouter,
  submissions: projectsChallengeSubmissionListRouter,
});
