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
      const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
      const normalUrl = `/users/${username}/starred`;
      const pagesToCheck = 5;
      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'GITHUB_STAR';
      const userId = user.id;
      const identifier = username;

      const initialResponse = await octokit.request(`GET ${normalUrl}`, {
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

        if (!data.some((repo: any) => repo.id === GITHUB_REPO_ID)) {
          throw 'Not starred';
        }

        await prisma.rewardsTaskCompletion.create({
          data: {
            action,
            campaign,
            identifier,
            userId,
          },
        });

        return true;
      }

      // Get the last 5 pages
      const lastUrl =
        initialResponse.headers.link?.match(lastPattern)?.[0] ?? '';
      const lastNumberString = lastUrl.match(/\d+$/)?.[0] ?? '0';
      const baseUrl = lastUrl.slice(0, -lastNumberString.length);
      const lastNumber = Number(lastNumberString);
      const urls =
        lastNumber === 0
          ? []
          : Array.from(
              { length: pagesToCheck },
              (_, i) => `${baseUrl}${lastNumber - i}`,
            );

      const responses = await Promise.all(
        urls.map((url) =>
          octokit.request(`GET ${url}`, {
            headers: {
              Accept: 'application/vnd.github+json',
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
            per_page: 100,
          }),
        ),
      );

      const ids = responses.flatMap((response) =>
        response.data.map((repo: any) => repo.id),
      );

      const isStarred = ids.includes(GITHUB_REPO_ID);

      if (!isStarred && lastNumber <= pagesToCheck) {
        throw 'Not starred';
      }

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

      // Allow 3 promo generations since some users
      // might waste the promo code on failed payments (e.g. India).
      if (promotionCodes.data.length > 3) {
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
