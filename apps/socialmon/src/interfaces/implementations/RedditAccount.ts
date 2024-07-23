import type { z } from 'zod';

import type { accountSchema } from '~/schema';
import prisma from '~/server/prisma';

import type { Account } from '../Account';

import type { AccountType } from '~/types';

class RedditAccount implements Account {
  async getAccount(username: string) {
    return await prisma.redditAccount.findUnique({
      where: {
        username,
      },
    });
  }

  async addAccount(account: z.input<typeof accountSchema>) {
    await prisma.redditAccount.create({
      data: {
        clientId: account.clientId,
        clientSecret: account.clientSecret,
        password: account.password,
        username: account.username,
      },
    });
  }
  async deleteAccount(username: string) {
    await prisma.redditAccount.delete({
      where: {
        username,
      },
    });
  }

  async getAccounts(): Promise<Array<AccountType>> {
    // TODO: Don't fetch sensitive fields.
    return await prisma.redditAccount.findMany();
  }
}

export default RedditAccount;
