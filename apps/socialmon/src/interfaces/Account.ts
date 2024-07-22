import type { z } from 'zod';

import type { accountSchema } from '~/schema';

import type { AccountType } from '~/types';

export type Account = {
  addAccount(account: z.input<typeof accountSchema>): void;
  deleteAccount(username: string): void;
  getAccount(username: string): Promise<AccountType | null>;
  getAccounts(): Promise<Array<AccountType>>;
};
