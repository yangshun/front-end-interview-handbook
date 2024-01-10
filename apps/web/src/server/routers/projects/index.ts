import { projectsProfileRouter } from './profile';
import { projectsSessionsRouter } from './sessions';
import { router } from '../../trpc';

export const projectsRouter = router({
  profile: projectsProfileRouter,
  sessions: projectsSessionsRouter,
});
