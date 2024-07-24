import type { z } from 'zod';

import type { userSchema } from '~/schema';
import prisma from '~/server/prisma';

import type { PlatformUser } from '../PlatformUser';

import type { SocialUser } from '~/types';

class RedditUser implements PlatformUser {
  async getPlatformUser(username: string) {
    return await prisma.redditUser.findUnique({
      where: {
        username,
      },
    });
  }

  async addPlatformUser(account: z.input<typeof userSchema>) {
    await prisma.redditUser.create({
      data: {
        password: account.password,
        username: account.username,
      },
    });
  }
  async deletePlatformUser(username: string) {
    await prisma.redditUser.delete({
      where: {
        username,
      },
    });
  }

  async getPlatformUsers(): Promise<Array<SocialUser>> {
    return await prisma.redditUser.findMany({
      select: {
        username: true,
      },
    });
  }
}

export default RedditUser;
