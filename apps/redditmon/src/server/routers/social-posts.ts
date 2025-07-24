import { TRPCError } from '@trpc/server';
import fetch from 'node-fetch';
import type { Submission } from 'snoowrap';
import { z } from 'zod';

import { redditPermalinkToAPIUrl } from '~/components/posts/utils';

import {
  createRedditPost,
  getAccessToken,
  replyToRedditPost,
} from '~/db/RedditUtils';
import { decryptPassword } from '~/db/utils';
import {
  ActivityAction,
  PostRelevancy,
  PostRepliedStatus,
} from '~/prisma/client';

import AIProvider from '../../providers/AIProvider';
import type { Comments } from '../../types';
import prisma from '../prisma';
import { fetchPostsFromPlatform } from '../services/getPostsFromPlatform';
import { router, userProcedure } from '../trpc';

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
          'User-Agent': process.env.REDDIT_USER_AGENT ?? 'redditmon-gfe/0.1.0',
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
        post: await createRedditPost({
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
          tab: z.enum(['ALL', 'PENDING', 'REPLIED', 'IRRELEVANT']),
        }),
        pagination: z.object({
          limit: z.number().min(1).max(100).default(10),
        }),
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, filter, pagination, projectSlug } = input;
      const { limit } = pagination;
      const { tab } = filter;

      let postFilter = {};

      switch (tab) {
        case 'PENDING': {
          postFilter = {
            OR: [{ relevancy: null }, { relevancy: PostRelevancy.RELEVANT }],
            replied: PostRepliedStatus.NOT_REPLIED,
          };
          break;
        }
        case 'REPLIED': {
          postFilter = {
            OR: [
              {
                reply: {
                  isNot: null,
                },
              },
              {
                replied: {
                  in: [
                    PostRepliedStatus.REPLIED_MANUALLY,
                    PostRepliedStatus.REPLIED_VIA_APP,
                  ],
                },
              },
            ],
          };
          break;
        }
        case 'IRRELEVANT': {
          postFilter = {
            relevancy: PostRelevancy.IRRELEVANT,
          };
          break;
        }
        case 'ALL': {
          break;
        }
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
          permalink: true,
          relevancy: true,
          replied: true,
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
      return await fetchPostsFromPlatform(projectSlug);
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
        ctx: { session },
        input: { postId, projectSlug, relevancy },
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
  markPostReplyStatus: userProcedure
    .input(
      z.object({
        postId: z.string(),
        projectSlug: z.string(),
        replyStatus: z.enum([
          PostRepliedStatus.NOT_REPLIED,
          PostRepliedStatus.REPLIED_MANUALLY,
        ]),
      }),
    )
    .mutation(
      async ({
        ctx: { session },
        input: { postId, projectSlug, replyStatus },
      }) => {
        const activityAction =
          replyStatus === PostRepliedStatus.REPLIED_MANUALLY
            ? ActivityAction.MARKED_AS_REPLIED
            : ActivityAction.MARKED_AS_NOT_REPLIED;

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
              replied: replyStatus,
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
    .mutation(async ({ ctx: { session }, input }) => {
      const { id, projectSlug, redditUserId, response } = input;
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

      const { response: redditResponse, success } = await replyToRedditPost({
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
            replied: PostRepliedStatus.REPLIED_VIA_APP,
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
