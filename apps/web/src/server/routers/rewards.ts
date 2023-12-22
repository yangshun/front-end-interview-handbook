import { Octokit } from 'octokit';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

// ID for https://github.com/greatfrontend/awesome-front-end-system-design
const REPO_ID = 593048179;
const ORG_NAME = 'greatfrontend';

export const rewardsRouter = router({
  checkGitHubFollowing: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      const { status } = await fetch(
        `https://api.github.com/users/${username}/following/${ORG_NAME}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          method: 'GET',
        },
      );

      if (status !== 204) {
        return false;
      }

      // Insert task into db
      const campaign = 'SOCIAL_MEDIA_PREMIUM_20';
      const task = 'GITHUB_FOLLOW';
      const userId = user.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          campaign,
          identifier,
          task,
          userId,
        },
      });

      return true;
    }),
  checkGitHubStarred: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      const octokit = new Octokit({});

      const data = await octokit.paginate(
        'GET https://api.github.com/users/{username}/starred',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          per_page: 100,
          username,
        },
      );

      if (!data.some((repo: any) => repo.id === REPO_ID)) {
        return false;
      }

      // Insert task into db
      const campaign = 'SOCIAL_MEDIA_PREMIUM_20';
      const task = 'GITHUB_STAR';
      const userId = user.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          campaign,
          identifier,
          task,
          userId,
        },
      });

      return true;
    }),
  getTasksCompleted: userProcedure
    .input(
      z.object({
        campaign: z.enum(['SOCIAL_MEDIA_PREMIUM_20']),
      }),
    )
    .query(async ({ input: { campaign }, ctx: { user } }) => {
      const userId = user.id;
      const tasks = await prisma.rewardsTaskCompletion.findMany({
        where: {
          campaign,
          userId,
        },
      });

      return tasks;
    }),
});
