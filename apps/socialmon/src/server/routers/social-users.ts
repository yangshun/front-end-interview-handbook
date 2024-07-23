import { z } from 'zod';

import UserManager from '~/interfaces/implementations/UserManager';
import type { PlatformUser } from '~/interfaces/PlatformUser';
import { userSchema } from '~/schema';

import { router, userProcedure } from '../trpc';

function getPLatformUserInstance(): PlatformUser {
  const userManager = UserManager.getInstance();

  return userManager.getPlatformUserInstance('Reddit');
}

export const socialUsersRouter = router({
  addPlatformUser: userProcedure
    .input(
      z.object({
        user: userSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { user } = input;

      const userInstance = getPLatformUserInstance();

      await userInstance.addPlatformUser(user);
    }),
  deletePlatformUser: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ input: { username } }) => {
      const userInstance = getPLatformUserInstance();

      await userInstance.deletePlatformUser(username);
    }),
  getPlatformUsers: userProcedure.query(async () => {
    const userInstance = getPLatformUserInstance();

    return await userInstance.getPlatformUsers();
  }),
});
