import { z } from 'zod';

import { redditPermalinkToAPIUrl } from '~/components/posts/utils';

import {
  createRedditPost,
  getPostsFromReddit,
  replyToRedditPost,
} from '~/db/RedditUtils';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';
import OpenAIProvider from '../../providers/OpenAIProvider';
import type { Comments } from '../../types';

import { TRPCError } from '@trpc/server';

function getAIProvider() {
  return new OpenAIProvider();
}

export const socialPostsRouter = router({
  generateResponse: userProcedure
    .input(
      z.object({
        post: z.object({
          content: z.string(),
          id: z.string(),
          title: z.string(),
        }),
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
  getPostComments: userProcedure
    .input(
      z.object({
        permalink: z.string(),
      }),
    )
    .query(async ({ input: { permalink } }) => {
      const apiUrl = redditPermalinkToAPIUrl(permalink);
      // To convert post url from https://www.reddit.com/r/*/need_beta_users_for_my_frontend_microsaas_tool/ to https://www.reddit.com/r/*/need_beta_users_for_my_frontend_microsaas_tool.json
      const postResponse = await fetch(`${apiUrl.replace(/\/$/, '')}.json`, {
        method: 'GET',
      });

      const data = await postResponse.json();
      const [post, comments] = data;

      // Because the 2nd item in the response is always the comments
      return {
        comments: comments as Comments,
        post: createRedditPost({
          matchedKeywords: [],
          post: post.data.children[0].data,
        }),
      };
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
          : {
              reply:
                tab === 'unreplied'
                  ? {
                      is: null,
                    }
                  : {
                      isNot: null,
                    },
            };

      const posts = await prisma.redditPost.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          reply: {
            include: {
              redditUser: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
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
        postId: z.string(),
        redditUserId: z.string().uuid(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { postId, response, redditUserId } = input;
      const user = await prisma.redditUser.findUnique({
        where: {
          id: redditUserId,
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
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        });
      }

      return await prisma.redditPostReply.create({
        data: {
          content: redditResponse?.body || response,
          createdAt: redditResponse?.created_utc
            ? new Date(redditResponse.created_utc * 1000) // In milliseconds
            : new Date(),
          permalink: redditResponse?.permalink ?? '',
          postId,
          redditUserId,
        },
      });
    }),
  updatePost: userProcedure
    .input(
      z.object({
        data: z.object({
          commentsCount: z.number().optional(),
          content: z.string(),
          title: z.string(),
          upvoteCount: z.number().optional(),
        }),
        postId: z.string(),
      }),
    )
    .mutation(
      async ({
        input: {
          data: { commentsCount, content, title, upvoteCount },
          postId,
        },
      }) => {
        await prisma.redditPost.update({
          data: {
            commentsCount,
            content,
            title,
            upvoteCount,
            ...((commentsCount || upvoteCount) && {
              statsUpdatedAt: new Date(),
            }),
          },
          where: {
            id: postId,
          },
        });
      },
    ),
});
