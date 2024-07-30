import { z } from 'zod';

import { getPostsFromReddit, replyToRedditPost } from '~/db/RedditUtils';
import { postSchema } from '~/schema';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';
import OpenAIProvider from '../../providers/OpenAIProvider';

function getAIProvider() {
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
      const result = await aiProvider.generateResponseTo(post);

      return await prisma.redditPost.update({
        data: {
          response: result.response,
        },
        where: {
          id: post.id,
        },
      });
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
      const { limit } = pagination;
      const { tab } = filter;

      const postFilter =
        tab === 'all'
          ? {}
          : tab === 'unreplied'
            ? { replied: false }
            : { replied: true };

      const posts = await prisma.redditPost.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          postedAt: 'desc',
        },
        take: limit + 1,
        where: {
          ...postFilter,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = posts.pop()!;

        nextCursor = nextItem.id;
      }

      return {
        nextCursor,
        posts,
      };
    }),
  getPostsFromPlatform: userProcedure.query(async () => {
    const postsFromReddit = await getPostsFromReddit();

    // Add it to the db
    return await prisma.redditPost.createMany({
      data: postsFromReddit,
      skipDuplicates: true,
    });
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
      const user = await prisma.redditUser.findUnique({
        where: {
          username: accountUsername,
        },
      });

      if (!user) {
        throw new Error('Account is required to reply to a post.');
      }

      const { success, response: redditResponse } = await replyToRedditPost({
        postId,
        response,
        user: { password: user.password, username: user.username },
      });

      if (!success) {
        throw new Error('Something went wrong!');
      }

      // Update the db with the actual response from the reddit
      return await prisma.redditPost.update({
        data: {
          replied: true,
          repliedAt: redditResponse?.created_utc
            ? new Date(redditResponse.created_utc * 1000) // In milliseconds
            : new Date(),
          response: redditResponse?.body_html || response,
        },
        where: {
          id: postId,
        },
      });
    }),
});
