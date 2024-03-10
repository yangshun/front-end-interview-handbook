import { Octokit } from 'octokit';
import Stripe from 'stripe';
import type { ZodError } from 'zod';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { router, userProcedure } from '../trpc';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9-]+$/;
const LINKEDIN_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const TWITTER_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
// ID for https://github.com/greatfrontend/awesome-front-end-system-design
const GITHUB_REPO_ID = 593048179;
const GITHUB_ORG_NAME = 'greatfrontend';
const SOCIAL_TASKS_DISCOUNT_CAMPAIGN = 'SOCIAL_TASKS_DISCOUNT';

const gitHubUsernameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Must be two characters or more' })
  .regex(GITHUB_USERNAME_REGEX, {
    message:
      'Contains invalid characters. Only alphanumeric characters and hyphens allowed',
  });
const linkedInUsernameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Must be two characters or more' })
  .regex(LINKEDIN_USERNAME_REGEX, {
    message:
      'Contains invalid characters. Only alphanumeric characters, hyphens, and underscore allowed.',
  });
const twitterUsernameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Must be two characters or more' })
  .regex(TWITTER_USERNAME_REGEX, {
    message:
      'Contains invalid characters. Only alphanumeric characters, hyphens, and underscore allowed.',
  });

const socialTasksDiscountCouponId_TEST = 'HvFQPL5W';
const socialTasksDiscountCouponId_PROD = 'IAx9mkqM';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const rewardsRouter = router({
  checkGitHubFollowing: userProcedure
    .input(
      z.object({
        username: gitHubUsernameSchema,
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
        username: gitHubUsernameSchema,
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

      // TODO: Migrate to octokit SDK methods.
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

        if (
          !data.some(
            // TODO: Remove manual typing after migrating to octokit SDK methods.
            (repo: Readonly<{ id: number }>) => repo.id === GITHUB_REPO_ID,
          )
        ) {
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
          // TODO: Remove manual typing after migrating to octokit SDK methods.
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
        // TODO: Remove after using typesafe Octokit APIs.
        response.data.map((repo: Readonly<{ id: number }>) => repo.id),
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
        username: linkedInUsernameSchema,
      }),
    )
    .mutation(async ({ input: { username }, ctx: { user } }) => {
      await delay(1000);

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'LINKEDIN_FOLLOW';
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
  checkTwitterFollowing: userProcedure
    .input(
      z.object({
        username: twitterUsernameSchema,
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
        apiVersion: '2023-10-16',
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
      apiVersion: '2023-10-16',
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
      return null;
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
        linkedInUsername: z.string(),
        twitterUsername: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { gitHubUsername, linkedInUsername, twitterUsername },
      }) => {
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
            try {
              // Validate inside here rather than at the query input so that
              // we can provide granular errors.
              linkedInUsernameSchema.parse(linkedInUsername);
            } catch (error) {
              throw (error as ZodError).issues[0].message;
            }
          })(),
          (async () => {
            try {
              // Validate inside here rather than at the query input so that
              // we can provide granular errors.
              twitterUsernameSchema.parse(twitterUsername);
            } catch (error) {
              throw (error as ZodError).issues[0].message;
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
