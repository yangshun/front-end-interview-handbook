import { z } from 'zod';

import RedditPlatform from '~/interfaces/implementations/RedditPlatform';

import { publicProcedure, router } from '../trpc';
import { type Platform } from '../../interfaces/Platform';
import { type Post } from '../../models/Post';

function getPlatform(): Platform {
    const clientId = process.env.REDDIT_CLIENT_ID as string;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
    const userAgent = process.env.REDDIT_USER_AGENT as string;
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;
    const subreddits = ['reactjs', 'javascript'];
    const keywords = ['typescript', 'javascript'];
    const timeframeInHours = 1;

    const platform: Platform = new RedditPlatform(
        clientId,
        clientSecret,
        userAgent,
        username,
        password,
        subreddits,
        keywords,
        timeframeInHours,
    );

    return platform;
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
  getRepliedPosts: publicProcedure.query(async () => {
    const platform = getPlatform();

    try {
      const repliedPosts = await platform.getRepliedPosts();

      return repliedPosts;
    } catch (error) {
      console.error('Error fetching replied posts:', error);

      return null;
    }
  }),

  getUnrepliedPosts: publicProcedure.query(async () => {
    const platform = getPlatform();

    try {
      const unrepliedPosts = await platform.getUnrepliedPosts();

      return unrepliedPosts;
    } catch (error) {
      console.error('Error fetching unreplied posts:', error);

      return null;
    }
  }),

  helloWorld: publicProcedure.query(async () => {
    return 'Hello world!';
  }),

  replyToPost: publicProcedure
    .input(
      z.object({
        post: postSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const post = input.post as Post;
      const platform = getPlatform();

      try {
        const success = await platform.replyToPost({
          content: post.content,
          foundAt: post.foundAt,
          id: post.id,
          postedAt: post.postedAt,
          replied: post.replied,
          repliedAt: post.repliedAt,
          response: post.response,
          title: post.title,
          url: post.url,
        });

        return success;
      } catch (error) {
        console.error('Error replying to post:', error);

        return false;
      }
    }),

  updatePost: publicProcedure
    .input(
      z.object({
        post: postSchema,
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const post = input.post as Post;
      const platform = getPlatform();

      try {
        const success = await platform.updatePost({
          content: post.content,
          foundAt: post.foundAt,
          id: post.id,
          postedAt: post.postedAt,
          replied: post.replied,
          repliedAt: post.repliedAt,
          response: post.response,
          title: post.title,
          url: post.url,
        });

        return success;
      } catch (error) {
        console.error('Error updating post:', error);

        return false;
      }
    }),



  // ReplyToPost
});
