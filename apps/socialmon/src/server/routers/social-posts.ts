import { z } from 'zod';

import PlatformManager from '~/interfaces/implementations/PlatformManager';
import UserManager from '~/interfaces/implementations/UserManager';
import type { PlatformUser } from '~/interfaces/PlatformUser';
import { postSchema } from '~/schema';

import { router, userProcedure } from '../trpc';
import { type AIProvider } from '../../interfaces/AIProvider';
import OpenAIProvider from '../../interfaces/implementations/OpenAIProvider';
import { type Platform } from '../../interfaces/Platform';

import type { SocialUser } from '~/types';

function getPlatform(user?: SocialUser): Platform {
  const username = user?.username || (process.env.REDDIT_USERNAME as string);
  const password = user?.password || (process.env.REDDIT_PASSWORD as string);

  const platformManager = PlatformManager.getInstance();

  const redditPlatformParams = {
    password,
    username,
  };

  const redditPlatform = platformManager.getPlatform(
    'Reddit',
    redditPlatformParams,
  );

  return redditPlatform;
}

function getPlatformUserInstance(): PlatformUser {
  const userManager = UserManager.getInstance();

  return userManager.getPlatformUserInstance('Reddit');
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
      const { post } = input;
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
      const userInstance = getPlatformUserInstance();
      const account = await userInstance.getPlatformUser(accountUsername);

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
