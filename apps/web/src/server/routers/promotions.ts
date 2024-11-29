import { Octokit } from 'octokit';
import Stripe from 'stripe';
import type { ZodError } from 'zod';
import { z } from 'zod';

import {
  GITHUB_STAR_JS_INTERVIEWS,
  GITHUB_STAR_SYSTEM_DESIGN,
} from '~/components/rewards/tasks/RewardsTaskItem';

import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router, userProcedure } from '../trpc';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9-]+$/;
const LINKEDIN_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const TWITTER_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const GITHUB_REPO_ID_SYSTEM_DESIGN = 593048179; // https://github.com/greatfrontend/awesome-front-end-system-design
const GITHUB_REPO_ID_JS_INTERVIEW = 812973427; // https://github.com/yangshun/top-javascript-interview-questions

const GitHubStarActionNames = [
  GITHUB_STAR_JS_INTERVIEWS,
  GITHUB_STAR_SYSTEM_DESIGN,
] as const;

const GitHubStarActionToRepoId: Record<
  (typeof GitHubStarActionNames)[number],
  number
> = {
  [GITHUB_STAR_JS_INTERVIEWS]: GITHUB_REPO_ID_JS_INTERVIEW,
  [GITHUB_STAR_SYSTEM_DESIGN]: GITHUB_REPO_ID_SYSTEM_DESIGN,
};
const GITHUB_ORG_NAME = 'greatfrontend';
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

const SOCIAL_TASKS_DISCOUNT_CAMPAIGN = 'SOCIAL_TASKS_DISCOUNT';
const STUDENT_DISCOUNT_CAMPAIGN = 'STUDENT_DISCOUNT';

const studentDiscountCouponId_TEST = 'r1nhvjSn';
const studentDiscountCouponId_PROD = 'tgklHrfQ';

const socialTasksDiscountCouponId_TEST = 'HvFQPL5W';
const socialTasksDiscountCouponId_PROD = 'IAx9mkqM';

const interviewsPremiumPerkProjectsDiscountCouponId_TEST = 'hV8qtZIX';
const interviewsPremiumPerkProjectsDiscountCouponId_PROD = 'SKcIcPgB';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const promotionsRouter = router({
  checkGitHubFollowing: userProcedure
    .input(
      z.object({
        username: gitHubUsernameSchema,
      }),
    )
    .mutation(async ({ input: { username }, ctx: { viewer } }) => {
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
      const userId = viewer.id;
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
        action: z.enum(GitHubStarActionNames),
        username: gitHubUsernameSchema,
      }),
    )
    .mutation(async ({ input: { action, username }, ctx: { viewer } }) => {
      const octokit = new Octokit({});
      const repoId = GitHubStarActionToRepoId[action];

      const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
      const normalUrl = `/users/${username}/starred`;
      const pagesToCheck = 5;
      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const userId = viewer.id;
      const identifier = username;

      if (repoId == null) {
        throw `No matching repo for ${action}`;
      }

      // TODO: Migrate to octokit SDK methods
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
            (repo: Readonly<{ id: number }>) => repo.id === repoId,
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
          // TODO: Remove manual typing after migrating to octokit SDK methods
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
        // TODO: Remove after using typesafe Octokit APIs
        response.data.map((repo: Readonly<{ id: number }>) => repo.id),
      );

      const isStarred = ids.includes(GITHUB_REPO_ID_JS_INTERVIEW);

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
    .mutation(async ({ input: { username }, ctx: { viewer } }) => {
      await delay(1000);

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'LINKEDIN_FOLLOW';
      const userId = viewer.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
          userId,
        },
      });

      // No way to actually check, just assume its real
      return true;
    }),

  checkTwitterFollowing: userProcedure
    .input(
      z.object({
        username: twitterUsernameSchema,
      }),
    )
    .mutation(async ({ input: { username }, ctx: { viewer } }) => {
      await delay(1000);

      const campaign = SOCIAL_TASKS_DISCOUNT_CAMPAIGN;
      const action = 'TWITTER_FOLLOW';
      const userId = viewer.id;
      const identifier = username;

      await prisma.rewardsTaskCompletion.create({
        data: {
          action,
          campaign,
          identifier,
          userId,
        },
      });

      // No way to actually check, just assume its real
      return true;
    }),
  generateOrGetInterviewsPremiumPerksProjectsDiscountPromoCode:
    userProcedure.mutation(async ({ ctx: { viewer } }) => {
      const userId = viewer.id;

      const profile = await prisma.profile.findFirst({
        where: {
          id: userId,
        },
      });

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });

      const stripeCustomer = profile?.stripeCustomer;

      if (profile == null || stripeCustomer == null) {
        throw 'No profile found';
      }

      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? interviewsPremiumPerkProjectsDiscountCouponId_PROD
          : interviewsPremiumPerkProjectsDiscountCouponId_TEST;

      const promotionCodes = await stripe.promotionCodes.list({
        active: true,
        coupon,
        customer: stripeCustomer,
      });

      // Return an active promo code.
      if (promotionCodes.data.length > 0) {
        return promotionCodes.data[0];
      }

      const today = new Date();
      const threeDaysLater = new Date(today.setDate(today.getDate() + 3));
      const threeDaysLaterUnix = Math.round(threeDaysLater.getTime() / 1000);

      const promotionCode = await stripe.promotionCodes.create({
        coupon,
        customer: stripeCustomer,
        expires_at: threeDaysLaterUnix,
        max_redemptions: 2,
        metadata: {
          campaign: 'INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT',
        },
      });

      return promotionCode;
    }),
  generateOrGetSocialTasksPromoCode: userProcedure.mutation(
    async ({ ctx: { viewer } }) => {
      const userId = viewer.id;

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

      if (profile == null) {
        throw 'No profile found';
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });

      let stripeCustomer = profile?.stripeCustomer;

      if (stripeCustomer == null) {
        // Create Stripe customer on the fly rather than error-ing
        const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();
        const {
          data: { user },
          error,
        } = await supabaseAdmin.auth.admin.getUserById(userId);

        if (error != null || user == null) {
          throw error;
        }

        const newCustomer = await stripe.customers.create(
          {
            email: user.email,
            name: user.user_metadata.name,
          },
          {
            idempotencyKey: user.id,
          },
        );

        stripeCustomer = newCustomer.id;
        await prisma.profile.update({
          data: {
            stripeCustomer,
          },
          where: {
            id: user.id,
          },
        });
      }

      if (stripeCustomer == null) {
        throw 'No Stripe customer found';
      }

      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? socialTasksDiscountCouponId_PROD
          : socialTasksDiscountCouponId_TEST;

      const [activePromoCodes, inactivePromoCodes] = await Promise.all([
        stripe.promotionCodes.list({
          active: true,
          coupon,
          customer: stripeCustomer,
        }),
        stripe.promotionCodes.list({
          active: false,
          coupon,
          customer: stripeCustomer,
        }),
      ]);

      // Return active promo code
      if (activePromoCodes.data.length > 0) {
        return activePromoCodes.data[0];
      }

      // Allow 3 promo generations since some users might waste
      // the promo code on failed payments (e.g. India)
      if (inactivePromoCodes.data.length > 3) {
        throw 'You have claimed this reward before.';
      }

      // Generate a new promo code
      const today = new Date();
      const threeDaysLater = new Date(today.setDate(today.getDate() + 3));
      const threeDaysLaterUnix = Math.round(threeDaysLater.getTime() / 1000);

      return await stripe.promotionCodes.create({
        coupon,
        customer: stripeCustomer,
        expires_at: threeDaysLaterUnix,
        max_redemptions: 2,
        metadata: {
          campaign: SOCIAL_TASKS_DISCOUNT_CAMPAIGN,
        },
      });
    },
  ),
  generateStudentDiscountPromoCode: userProcedure.mutation(
    async ({ ctx: { viewer } }) => {
      const profile = await prisma.profile.findFirst({
        where: {
          id: viewer.id,
        },
      });

      // TODO(projects): handle interviews vs projects premium.
      if (profile == null || profile?.premium || !profile?.stripeCustomer) {
        return null;
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });

      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? studentDiscountCouponId_PROD
          : studentDiscountCouponId_TEST;
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
      const threeDaysLater = new Date(today.setDate(today.getDate() + 3));
      const threeDaysLaterUnix = Math.round(threeDaysLater.getTime() / 1000);

      const promotionCode = await stripe.promotionCodes.create({
        coupon,
        customer,
        expires_at: threeDaysLaterUnix,
        max_redemptions: 1,
        metadata: {
          campaign: STUDENT_DISCOUNT_CAMPAIGN,
        },
      });

      return promotionCode;
    },
  ),
  getSocialTasksPromoCode: userProcedure.query(async ({ ctx: { viewer } }) => {
    const userId = viewer.id;
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
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
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
  // Intentionally make it publicProcedure since this can be called by
  // non-logged in users and showing an error is ugly.
  // We just return `null` if not logged in.
  getStudentDiscountPromoCode: publicProcedure.query(
    async ({ ctx: { viewer } }) => {
      if (viewer == null) {
        return null;
      }

      const viewerId = viewer.id;
      const profile = await prisma.profile.findFirst({
        where: {
          id: viewerId,
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
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? studentDiscountCouponId_PROD
          : studentDiscountCouponId_TEST;

      const promotionCodes = await stripe.promotionCodes.list({
        active: true,
        coupon,
        customer,
      });

      if (promotionCodes.data.length === 0) {
        return null;
      }

      return promotionCodes.data[0];
    },
  ),
  getTasksCompleted: userProcedure.query(async ({ ctx: { viewer } }) => {
    return await prisma.rewardsTaskCompletion.findMany({
      where: {
        campaign: SOCIAL_TASKS_DISCOUNT_CAMPAIGN,
        userId: viewer.id,
      },
    });
  }),
  // Intentionally make it publicProcedure since this can be called by
  // non-logged in users and showing an error is ugly.
  // We just return `null` if not logged in.
  userPromoCodes: publicProcedure.query(async ({ ctx: { viewer } }) => {
    if (viewer == null) {
      return null;
    }

    const profile = await prisma.profile.findFirst({
      where: {
        id: viewer.id,
      },
    });

    const customer = profile?.stripeCustomer;

    if (profile == null || !customer) {
      return null;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const promotionCodes = await stripe.promotionCodes.list({
      active: true,
      customer,
    });

    return promotionCodes;
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
