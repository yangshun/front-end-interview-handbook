import { profileRouter } from './profile';
import { router } from '../../trpc';

export const projectsRouter = router({
  profile: profileRouter,
});
