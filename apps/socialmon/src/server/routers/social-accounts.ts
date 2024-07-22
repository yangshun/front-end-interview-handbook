import { z } from 'zod';

import type { Account } from '~/interfaces/Account';
import AccountManager from '~/interfaces/implementations/AccountManager';
import { accountSchema } from '~/schema';

import { router, userProcedure } from '../trpc';

function getAccountInstance(): Account {
  const platformManager = AccountManager.getInstance();

  return platformManager.getAccountInstance('Reddit');
}

export const socialAccountsRouter = router({
  addAccount: userProcedure
    .input(
      z.object({
        account: accountSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { account } = input;

      const accountInstance = getAccountInstance();

      await accountInstance.addAccount(account);
    }),
  deleteAccount: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .mutation(async ({ input: { username } }) => {
      const accountInstance = getAccountInstance();

      await accountInstance.deleteAccount(username);
    }),
  getAccounts: userProcedure.query(async () => {
    const accountInstance = getAccountInstance();

    return await accountInstance.getAccounts();
  }),
});
