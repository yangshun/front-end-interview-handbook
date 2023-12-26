import { Octokit } from 'octokit';
import Stripe from 'stripe';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

// ID for https://github.com/greatfrontend/awesome-front-end-system-design
const GITHUB_REPO_ID = 593048179;
const GITHUB_ORG_NAME = 'greatfrontend';
const SOCIAL_TASKS_DISCOUNT_CAMPAIGN = 'SOCIAL_TASKS_DISCOUNT';

/* eslint-disable camelcase */
const socialTasksDiscountCouponId_TEST = 'HvFQPL5W';
const socialTasksDiscountCouponId_PROD = 'IAx9mkqM';

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
    .mutation(async ({ input: { username }, ctx: { user } }) => {
      const { status } = await fetch(
        `https://api.github.com/users/${username}/following/${GITHUB_ORG_NAME}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
          method: 'GET',
        },
      );

      if (status !== 204) {
        throw 'Not followed';
      }

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'GITHUB_FOLLOW';
      const userId = user.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
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
    .mutation(async ({ input: { username }, ctx: { user } }) => {
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
        pagesRemaining = 0;

        const { data } = initialResponse;

        if (!data.some((repo: any) => repo.id === GITHUB_REPO_ID)) {
          throw 'Not starred';
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

        if (data.some((repo: any) => repo.id === GITHUB_REPO_ID)) {
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
        throw 'Not starred';
      }

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'GITHUB_STAR';
      const userId = user.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
          userId,
        },
      });

      return true;
    }),
  checkLinkedInFollowing: userProcedure
    .input(
      z.object({
        linkedInUrl: z.string(),
      }),
    )
    .mutation(async ({ input: { linkedInUrl }, ctx: { user } }) => {
      await delay(1000);

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'LINKEDIN_FOLLOW';
      const userId = user.id;
      const identifier = linkedInUrl;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
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
    .mutation(async ({ input: { username }, ctx: { user } }) => {
      await delay(1000);

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'TWITTER_FOLLOW';
      const userId = user.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
          userId,
        },
      });

      return true;
    }),
  generateSocialTasksPromoCode: userProcedure.mutation(
    async ({ ctx: { user } }) => {
      const userId = user.id;

      const tasks = await prisma.rewardsTaskCompletion.findMany({
        where: {
          campaign: SOCIAL_TASKS_DISCOUNT_CAMPAIGN,
          userId,
        },
      });

      if (tasks.length < 4) {
        throw 'Insufficient social tasks completed';
      }

      const profile = await prisma.profile.findFirst({
        where: {
          id: userId,
        },
      });

      if (profile == null || profile?.stripeCustomer == null) {
        throw 'No profile or Stripe customer found';
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      });

      const coupon =
        process.env.NODE_ENV === 'production'
          ? socialTasksDiscountCouponId_PROD
          : socialTasksDiscountCouponId_TEST;
      const customer = profile.stripeCustomer;

      const promotionCodes = await stripe.promotionCodes.list({
        coupon,
        customer,
      });

      if (promotionCodes.data.length > 1) {
        throw 'You have claimed this reward before.';
      }

      const today = new Date();
      const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
      const nextThreeDaysUnix = Math.round(nextThreeDays.getTime() / 1000);

      const promotionCode = await stripe.promotionCodes.create({
        coupon,
        customer,
        expires_at: nextThreeDaysUnix,
        max_redemptions: 1,
        metadata: {
          campaign: SOCIAL_TASKS_DISCOUNT_CAMPAIGN,
        },
      });

      return promotionCode;
    },
  ),
  getSocialTasksPromoCode: userProcedure.query(async ({ ctx: { user } }) => {
    const userId = user.id;
    const profile = await prisma.profile.findFirst({
      where: {
        id: userId,
      },
    });

    if (profile == null || profile?.stripeCustomer == null) {
      throw 'No profile or Stripe customer found';
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });

    const customer = profile.stripeCustomer;
    const coupon =
      process.env.NODE_ENV === 'production'
        ? socialTasksDiscountCouponId_PROD
        : socialTasksDiscountCouponId_TEST;

    const promotionCodes = await stripe.promotionCodes.list({
      active: true,
      coupon,
      customer,
    });

    if (promotionCodes.data.length === 0) {
      throw 'No promo codes found';
    }

    return promotionCodes.data[0];
  }),
  getTasksCompleted: userProcedure.query(async ({ ctx: { user } }) => {
    const userId = user.id;
    const tasks = await prisma.rewardsTaskCompletion.findMany({
      where: {
        campaign: SOCIAL_TASKS_DISCOUNT_CAMPAIGN,
        userId,
      },
    });

    return tasks;
  }),
  verifySocialHandles: userProcedure
    .input(
      z.object({
        gitHubUsername: z.string(),
        linkedInUrl: z.string(),
        twitterUsername: z.string(),
      }),
    )
    .mutation(
      async ({ input: { gitHubUsername, linkedInUrl, twitterUsername } }) => {
        const results = await Promise.allSettled([
          (async () => {
            if (!gitHubUsername.trim()) {
              throw 'Empty GitHub username';
            }

            const res = await fetch(
              `https://github.com/${encodeURIComponent(gitHubUsername.trim())}`,
            );

            if (!res.ok) {
              throw 'GitHub profile error';
            }
          })(),
          (async () => {
            if (
              !linkedInUrl.trim() ||
              !/linkedin\.com\/in\//.test(linkedInUrl)
            ) {
              throw 'Invalid LinkedIn profile';
            }
          })(),
          (async () => {
            if (twitterUsername.trim() === '') {
              throw 'Invalid Twitter username';
            }
          })(),
        ]);

        return {
          allValid: results.every(({ status }) => status === 'fulfilled'),
          fields: {
            gitHub: results[0],
            linkedIn: results[1],
            twitter: results[2],
          },
        };
      },
    ),
});
