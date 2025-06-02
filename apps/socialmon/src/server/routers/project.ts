import { TRPCError } from '@trpc/server';
import fetch from 'node-fetch';
import { z } from 'zod';

import { getAccessToken } from '~/db/RedditUtils';
import { projectSchema } from '~/schema';
import type { ProjectTransformed } from '~/types';

import prisma from '../prisma';
import { router, userProcedure } from '../trpc';

export const projectRouter = router({
  create: userProcedure
    .input(
      z.object({
        data: projectSchema,
      }),
    )
    .mutation(async ({ ctx: { session }, input: { data } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }
      await prisma.project.create({
        data: {
          ...data,
          subredditKeywords: {
            create: data.subredditKeywords.map(({ id: _id, ...rest }) => rest),
          },
        },
      });
    }),
  delete: userProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { session }, input: { projectId } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }
      await prisma.project.delete({
        where: {
          id: projectId,
        },
      });
    }),
  edit: userProcedure
    .input(
      z.object({
        data: projectSchema,
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { session }, input: { data, projectId } }) => {
      if (!session.user.isAdmin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized!',
        });
      }

      // 1. Delete all existing subredditKeywords for this project
      await prisma.projectSubredditKeywords.deleteMany({
        where: { projectId },
      });

      // 2. Create new subredditKeywords
      await prisma.project.update({
        data: {
          ...data,
          subredditKeywords: {
            create: data.subredditKeywords.map(({ id: _id, ...rest }) => rest),
          },
        },
        where: {
          id: projectId,
        },
      });
    }),
  get: userProcedure
    .input(
      z.object({
        projectSlug: z.string(),
      }),
    )
    .query(async ({ input: { projectSlug } }) => {
      return await prisma.project.findUnique({
        where: {
          slug: projectSlug,
        },
      });
    }),
  getAll: userProcedure.query(async () => {
    const result = await prisma.project.findMany({
      include: {
        subredditKeywords: true,
      },
    });

    return result as Array<ProjectTransformed>;
  }),
  searchSubreddits: userProcedure
    .input(z.object({ q: z.string().min(1) }))
    .query(async ({ input: { q } }) => {
      const accessToken = await getAccessToken();
      const url = new URL(`https://oauth.reddit.com/subreddits/search.json`);

      url.searchParams.append('q', q);
      url.searchParams.append('limit', '20');

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': process.env.REDDIT_USER_AGENT ?? 'socialmon-gfe/0.1.0',
        },
        method: 'GET',
      });

      if (response.status === 429) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch subreddits. Reddit API rate limit exceeded! Please try again some time.`,
        });
      }
      if (!response.ok) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch subreddits. Reddit API responded with status ${response.status}`,
        });
      }

      const data = (await response.json()) as Readonly<{
        data: {
          children: ReadonlyArray<{ data: { display_name: string } }>;
        };
      }>;

      return data.data.children.map((child) => child.data.display_name);
    }),
});
