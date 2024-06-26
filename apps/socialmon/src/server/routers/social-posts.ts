import { z } from 'zod';

import PlatformManager from '~/interfaces/implementations/PlatformManager';

import { publicProcedure, router } from '../trpc';
import { type AIProvider } from '../../interfaces/AIProvider';
import OpenAIProvider from '../../interfaces/implementations/OpenAIProvider';
import { type Platform } from '../../interfaces/Platform';

import type { Post } from '~/types';

function getPlatform(): Platform {
  const clientId = process.env.REDDIT_CLIENT_ID as string;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
  const userAgent = process.env.REDDIT_USER_AGENT as string;
  const username = process.env.REDDIT_USERNAME as string;
  const password = process.env.REDDIT_PASSWORD as string;

  const platformManager = PlatformManager.getInstance();

  const redditPlatformParams = {
    clientId,
    clientSecret,
    password,
    userAgent,
    username,
  };

  const redditPlatform = platformManager.getPlatform(
    'Reddit',
    redditPlatformParams,
  );

  return redditPlatform;
}

function getAIProvider(): AIProvider {
  return new OpenAIProvider();
}

const postSchema = z.object({
  content: z.string(),
  foundAt: z.union([z.date(), z.string()]).nullable(),
  id: z.string(),
  postedAt: z.union([z.date(), z.string()]).nullable(),
  replied: z.boolean(),
  repliedAt: z.union([z.date(), z.string()]).nullable(),
  response: z.string().nullable(),
  title: z.string(),
  url: z.string(),
});

export const socialPostsRouter = router({
  generateResponse: publicProcedure
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

  getPosts: publicProcedure
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

  replyToPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { postId, response } = input;
      const platform = getPlatform();

      try {
        const success = await platform.replyToPost({ postId, response });

        return success;
      } catch (error) {
        console.error('Error replying to post:', error);

        return false;
      }
    }),
});
