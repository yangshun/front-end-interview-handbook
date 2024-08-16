import { z } from 'zod';

import { redditPermalinkToAPIUrl } from '~/components/posts/utils';

import {
  createRedditPost,
  getPostsFromReddit,
  replyToRedditPost,
} from '~/db/RedditUtils';
import { decryptPassword } from '~/db/utils';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';
import OpenAIProvider from '../../providers/OpenAIProvider';
import type { Comments, ProjectTransformed } from '../../types';

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
        projectSlug: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { post } = input;

      const project = (await prisma.project.findUnique({
        where: {
          slug: input.projectSlug,
        },
      })) as ProjectTransformed;

      const aiProvider = getAIProvider();
      const result = await aiProvider.generateResponseTo({
        post,
        resources: project?.productsToAdvertise ?? [],
      });

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
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { pagination, filter, cursor, projectSlug } = input;
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

      const project = await prisma.project.findUnique({
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "Associated project doesn't exist!",
        });
      }

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
              user: {
                select: {
                  id: true,
                  name: true,
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
          projectId: project.id,
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
  getPostsFromPlatform: userProcedure
    .input(
      z.object({
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input: { projectSlug } }) => {
      const project = await prisma.project.findUnique({
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "Associated project doesn't exist!",
        });
      }

      const postsFromReddit = await getPostsFromReddit({
        keywords: project.keywords,
        subreddits: project.subreddits,
      });

      const postsFromRedditWithProjectId = postsFromReddit.map((post) => ({
        ...post,
        projectId: project.id,
      }));

      // Add it to the db
      return await prisma.redditPost.createMany({
        data: postsFromRedditWithProjectId,
        skipDuplicates: true,
      });
    }),
  replyToPost: userProcedure
    .input(
      z.object({
        id: z.string(),
        redditUserId: z.string().uuid(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { session } }) => {
      const { id, response, redditUserId } = input;
      const [post, user] = await Promise.all([
        prisma.redditPost.findUnique({
          where: {
            id,
          },
        }),
        prisma.redditUser.findUnique({
          where: {
            id: redditUserId,
          },
        }),
      ]);

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Account is required to reply to a post.',
        });
      }
      if (!post) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Associated post is required to reply to the post.',
        });
      }

      const decryptedPassword = decryptPassword(user.password, user.username);

      const { success, response: redditResponse } = await replyToRedditPost({
        postId: post.postId,
        response,
        user: { password: decryptedPassword, username: user.username },
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
          postId: id,
          redditUserId,
          userId: session.user.id,
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
