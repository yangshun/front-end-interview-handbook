import fetch from 'node-fetch';
import type { Submission } from 'snoowrap';
import { z } from 'zod';

import { redditPermalinkToAPIUrl } from '~/components/posts/utils';

import {
  createRedditPost,
  getAccessToken,
  getPostsFromReddit,
  replyToRedditPost,
} from '~/db/RedditUtils';
import { decryptPassword } from '~/db/utils';
import { ActivityAction, PostRelevancy } from '~/prisma/client';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';
import AIProvider from '../../providers/AIProvider';
import type { Comments } from '../../types';

import { TRPCError } from '@trpc/server';

function getAIProvider() {
  return new AIProvider();
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
      const { post, projectSlug } = input;

      const project = (await prisma.project.findUnique({
        select: { productsToAdvertise: true },
        where: { slug: projectSlug },
      })) as Readonly<{
        productsToAdvertise: ReadonlyArray<{
          description: string;
          url: string;
        }> | null;
      }>;

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project not found!',
        });
      }

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
      const accessToken = await getAccessToken();
      // To convert post url from https://www.reddit.com/r/*/need_beta_users_for_my_frontend_microsaas_tool/ to https://www.reddit.com/r/*/need_beta_users_for_my_frontend_microsaas_tool.json
      const response = await fetch(`${apiUrl.replace(/\/$/, '')}.json`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': process.env.REDDIT_USER_AGENT ?? 'socialmon-gfe/0.1.0',
        },
        method: 'GET',
      });

      if (response.status === 429) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch comments. Reddit API rate limit exceeded! Please try again some time.`,
        });
      }
      if (!response.ok) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch comments. Reddit API responded with status ${response.status}`,
        });
      }

      const data = await response.json();
      const [post, comments] = data as [
        Readonly<{
          data: {
            children: ReadonlyArray<{
              data: Submission;
            }>;
          };
        }>,
        Comments,
      ];

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
          tab: z.enum(['all', 'unreplied', 'replied', 'irrelevant']),
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

      let postFilter = {};

      if (tab === 'unreplied') {
        postFilter = {
          reply: {
            is: null,
          },
        };
      } else if (tab === 'replied') {
        postFilter = {
          reply: {
            isNot: null,
          },
        };
      } else if (tab === 'irrelevant') {
        postFilter = {
          relevancy: PostRelevancy.IRRELEVANT,
        };
      }

      const project = await prisma.project.findUnique({
        select: { id: true },
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project not found!',
        });
      }

      const posts = await prisma.redditPost.findMany({
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          commentsCount: true,
          createdAt: true,
          id: true,
          keywords: true,
          reply: true,
          statsUpdatedAt: true,
          subreddit: true,
          title: true,
          upvoteCount: true,
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
        select: {
          id: true,
          keywords: true,
          postFilteringPrompt: true,
          subreddits: true,
        },
        where: {
          slug: projectSlug,
        },
      });

      if (!project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Project not found!',
        });
      }

      const postsFromReddit = await getPostsFromReddit({
        keywords: project.keywords,
        postFilteringPrompt: project.postFilteringPrompt,
        subreddits: project.subreddits,
      });

      const postsFromRedditWithProjectId = postsFromReddit.map((post) => ({
        ...post,
        projectId: project.id,
      }));

      return await prisma.$transaction([
        // Add it to the db
        prisma.redditPost.createMany({
          data: postsFromRedditWithProjectId,
          skipDuplicates: true,
        }),
        // Update last posts fetch time
        prisma.project.update({
          data: {
            postsLastFetchedAt: new Date(),
          },
          where: {
            id: project.id,
          },
        }),
      ]);
    }),
  markPostRelevancy: userProcedure
    .input(
      z.object({
        postId: z.string().uuid(),
        projectSlug: z.string(),
        relevancy: z.enum([PostRelevancy.IRRELEVANT, PostRelevancy.RELEVANT]),
      }),
    )
    .mutation(
      async ({
        input: { relevancy, postId, projectSlug },
        ctx: { session },
      }) => {
        const activityAction =
          relevancy === 'RELEVANT'
            ? ActivityAction.MADE_RELEVANT
            : ActivityAction.MADE_IRRELEVANT;

        const project = await prisma.project.findUnique({
          select: { id: true },
          where: {
            slug: projectSlug,
          },
        });

        if (!project) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Project not found!',
          });
        }

        await prisma.$transaction([
          prisma.redditPost.update({
            data: {
              relevancy,
            },
            where: {
              id: postId,
            },
          }),
          // Create activity
          prisma.activity.create({
            data: {
              action: activityAction,
              postId,
              projectId: project.id,
              userId: session.user.id,
            },
          }),
        ]);
      },
    ),
  replyToPost: userProcedure
    .input(
      z.object({
        id: z.string(),
        projectSlug: z.string(),
        redditUserId: z.string().uuid(),
        response: z.string(),
      }),
    )
    .mutation(async ({ input, ctx: { session } }) => {
      const { id, response, redditUserId, projectSlug } = input;
      const [post, user, project] = await prisma.$transaction([
        prisma.redditPost.findUnique({ where: { id } }),
        prisma.redditUser.findUnique({ where: { id: redditUserId } }),
        prisma.project.findUnique({ where: { slug: projectSlug } }),
      ]);

      if (!user || !post || !project) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid data provided',
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

      await prisma.$transaction([
        prisma.redditPostReply.create({
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
        }),
        // Update post relevancy to relevant if a post has been replied
        prisma.redditPost.update({
          data: {
            relevancy: PostRelevancy.RELEVANT,
          },
          where: {
            id,
          },
        }),
        // Create activity
        prisma.activity.createMany({
          data: [
            {
              action: ActivityAction.REPLIED,
              postId: id,
              projectId: project.id,
              userId: session.user.id,
            },
            {
              action: ActivityAction.MADE_RELEVANT,
              postId: id,
              projectId: project.id,
              userId: session.user.id,
            },
          ],
        }),
      ]);
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
