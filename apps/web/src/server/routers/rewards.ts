import { Octokit } from 'octokit';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

// ID for https://github.com/greatfrontend/awesome-front-end-system-design
const REPO_ID = 593048179;
const ORG_NAME = 'greatfrontend';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
      const prevPattern = /(?<=<)([\S]*)(?=>; rel="prev")/i;
      const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
      let pagesRemaining = 5;
      let url = `/users/${username}/starred`;
      let isStarred = false;

      const initialResponse = await octokit.request(`GET ${url}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        per_page: 100,
      });

      // Check if there is a last page
      const hasLastPage = initialResponse.headers.link?.includes(`rel="last"`);

      if (!hasLastPage) {
        const { data } = initialResponse;

        if (!data.some((repo: any) => repo.id === REPO_ID)) {
          return false;
        }

        isStarred = true;
      }

      // Get the last page
      url = initialResponse.headers.link?.match(lastPattern)?.[0] ?? '';
      while (pagesRemaining) {
        const response = await octokit.request(`GET ${url}`, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          per_page: 100,
        });
        const { data } = response;

        if (data.some((repo: any) => repo.id === REPO_ID)) {
          isStarred = true;
          break;
        }

        // Check if there is a previous page
        const hasPrevPage = response.headers.link?.includes(`rel="prev"`);

        if (!hasPrevPage) {
          break;
        }

        // Get the previous page
        url = response.headers.link?.match(prevPattern)?.[0] ?? '';
        pagesRemaining--;
      }

      if (!isStarred && pagesRemaining > 0) {
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
  checkTwitterFollowing: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      await delay(1000);

      // Insert task into db
      const campaign = 'SOCIAL_MEDIA_PREMIUM_20';
      const task = 'TWITTER_FOLLOW';
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
  checkTwitterLike: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      await delay(1000);

      // Insert task into db
      const campaign = 'SOCIAL_MEDIA_PREMIUM_20';
      const task = 'TWITTER_LIKE';
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
  checkTwitterRetweet: userProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ input: { username }, ctx: { user } }) => {
      await delay(1000);

      // Insert task into db
      const campaign = 'SOCIAL_MEDIA_PREMIUM_20';
      const task = 'TWITTER_RETWEET';
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
