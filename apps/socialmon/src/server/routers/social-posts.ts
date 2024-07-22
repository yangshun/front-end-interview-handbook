import { z } from 'zod';

import type { Account } from '~/interfaces/Account';
import AccountManager from '~/interfaces/implementations/AccountManager';
import PlatformManager from '~/interfaces/implementations/PlatformManager';
import { postSchema } from '~/schema';

import { router, userProcedure } from '../trpc';
import { type AIProvider } from '../../interfaces/AIProvider';
import OpenAIProvider from '../../interfaces/implementations/OpenAIProvider';
import { type Platform } from '../../interfaces/Platform';

import type { AccountType, Post } from '~/types';

function getPlatform(account?: AccountType): Platform {
  const clientId =
    account?.clientId || (process.env.REDDIT_CLIENT_ID as string);
  const clientSecret =
    account?.clientSecret || (process.env.REDDIT_CLIENT_SECRET as string);
  const username = account?.username || (process.env.REDDIT_USERNAME as string);
  const password = account?.password || (process.env.REDDIT_PASSWORD as string);

  const platformManager = PlatformManager.getInstance();

  const redditPlatformParams = {
    clientId,
    clientSecret,
    password,
    username,
  };

  const redditPlatform = platformManager.getPlatform(
    'Reddit',
    redditPlatformParams,
  );

  return redditPlatform;
}

function getAccountInstance(): Account {
  const accountManager = AccountManager.getInstance();

  return accountManager.getAccountInstance('Reddit');
}

function getAIProvider(): AIProvider {
  return new OpenAIProvider();
}

export const socialPostsRouter = router({
  generateResponse: userProcedure
    .input(
      z.object({
        post: postSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const post = input.post as Post;
      const aiProvider = getAIProvider();

      try {
        const result = await aiProvider.generateResponseTo(post);

        const platform = getPlatform();
        const success = await platform.updateResponse({
          id: post.id,
          replied: false,
          repliedAt: null,
          response: result.response,
        });

        if (!success) {
          console.error('Error updating post:', post.id);

          return null;
        }

        return result;
      } catch (error) {
        console.error('Error generating response:', error);

        return null;
      }
    }),
  getPosts: userProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        filter: z.object({
          tab: z.enum(['all', 'unreplied', 'replied']),
        }),
        pagination: z.object({
          limit: z.number().min(1).max(100).default(10),
        }),
      }),
    )
    .query(async ({ input }) => {
      const { pagination, filter, cursor } = input;
      const platform = getPlatform();

      return await platform.getPosts({
        filter,
        pagination: { cursor, ...pagination },
      });
    }),
  getPostsFromPlatform: userProcedure.query(async () => {
    const platform = getPlatform();

    return await platform.getRelevantPosts();
  }),
  replyToPost: userProcedure
    .input(
      z.object({
        accountUsername: z.string(),
        postId: z.string(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { postId, response, accountUsername } = input;
      const accountInstance = getAccountInstance();
      const account = await accountInstance.getAccount(accountUsername);

      if (!account) {
        throw new Error('Account is required to reply to a post.');
      }

      const platform = getPlatform(account);

      await platform.replyToPost({
        accountUsername,
        postId,
        response,
      });
    }),
});
