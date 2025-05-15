import { router } from '../../trpc';
import { projectsChallengeRouter } from './challenge';
import { projectsChallengesRouter } from './challenges';
import { projectsCommentsRouter } from './comments';
import { projectsNotificationsRouter } from './notifications';
import { projectsProfileRouter } from './profile';
import { projectsSessionsRouter } from './sessions';
import { projectsChallengeSubmissionItemRouter } from './submission';
import { projectsChallengeSubmissionListRouter } from './submissions';

export const projectsRouter = router({
  challenge: projectsChallengeRouter,
  challenges: projectsChallengesRouter,
  comments: projectsCommentsRouter,
  notifications: projectsNotificationsRouter,
  profile: projectsProfileRouter,
  sessions: projectsSessionsRouter,
  submission: projectsChallengeSubmissionItemRouter,
  submissions: projectsChallengeSubmissionListRouter,
});
