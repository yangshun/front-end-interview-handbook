import { profileRouter } from './profile';
import { sessionsRouter } from './sessions';
import { router } from '../../trpc';

export const projectsRouter = router({
  profile: profileRouter,
  sessions: sessionsRouter,
});
