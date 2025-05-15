import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';
import Stripe from 'stripe';
import type { ZodError } from 'zod';
import { z } from 'zod';

import {
  PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_CAMPAIGN,
  PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_COUPON_ID_PROD,
  PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_COUPON_ID_TEST,
  PROMO_SOCIAL_DISCOUNT_CAMPAIGN,
  PROMO_SOCIAL_DISCOUNT_CODE_MAX_GENERATIONS,
  PROMO_SOCIAL_DISCOUNT_COUPON_ID_PROD,
  PROMO_SOCIAL_DISCOUNT_COUPON_ID_TEST,
  PROMO_STUDENT_DISCOUNT_CAMPAIGN,
  PROMO_STUDENT_DISCOUNT_CODE_MAX_GENERATIONS,
  PROMO_STUDENT_DISCOUNT_COUPON_ID_PROD,
  PROMO_STUDENT_DISCOUNT_COUPON_ID_TEST,
} from '~/data/PromotionConfig';

import {
  GITHUB_STAR_JS_INTERVIEWS,
  GITHUB_STAR_REACT_INTERVIEWS,
} from '~/components/rewards/tasks/RewardsTaskItem';

import prisma from '~/server/prisma';
import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

import { publicProcedure, router, userProcedure } from '../trpc';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9-]+$/;
const LINKEDIN_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const TWITTER_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const INSTAGRAM_USERNAME_REGEX = /^[a-zA-Z0-9-_.]+$/;
// GITHUB_REPO_ID_SYSTEM_DESIGN = 593048179; // https://github.com/greatfrontend/awesome-front-end-system-design
const GITHUB_REPO_ID_JS_INTERVIEW = 812973427; // https://github.com/yangshun/top-javascript-interview-questions
const GITHUB_REPO_ID_REACT_INTERVIEW = 815755359; // https://github.com/yangshun/top-reactjs-interview-questions

const GitHubStarActionNames = [
  GITHUB_STAR_JS_INTERVIEWS,
  GITHUB_STAR_REACT_INTERVIEWS,
] as const;

const GitHubStarActionToRepoId: Record<
  (typeof GitHubStarActionNames)[number],
  number
> = {
  [GITHUB_STAR_JS_INTERVIEWS]: GITHUB_REPO_ID_JS_INTERVIEW,
  [GITHUB_STAR_REACT_INTERVIEWS]: GITHUB_REPO_ID_REACT_INTERVIEW,
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
const instagramUsernameSchema = z
  .string()
  .trim()
  .min(2, { message: 'Must be two characters or more' })
  .regex(INSTAGRAM_USERNAME_REGEX, {
    message:
      'Contains invalid characters. Only alphanumeric characters, hyphens, periods, and underscore allowed.',
  });

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
    .mutation(async ({ ctx: { viewer }, input: { username } }) => {
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

      const campaign = PROMO_SOCIAL_DISCOUNT_CAMPAIGN;
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
    .mutation(async ({ ctx: { viewer }, input: { action, username } }) => {
      const MyOctokit = Octokit.plugin(restEndpointMethods);
      const octokit = new MyOctokit({
        auth: process.env.GITHUB_TOKEN,
      });
      const repoId = GitHubStarActionToRepoId[action];

      const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
      const pagesToCheck = 5;
      const campaign = PROMO_SOCIAL_DISCOUNT_CAMPAIGN;
      const userId = viewer.id;
      const identifier = username;

      if (repoId == null) {
        throw `No matching repo for ${action}`;
      }

      const initialResponse =
        await octokit.rest.activity.listReposStarredByUser({
          headers: {
            Accept: 'application/vnd.github+json',
          },
          per_page: 100,
          username,
        });

      // Check if there is a last page
      const hasLastPage = initialResponse.headers.link?.includes(`rel="last"`);

      if (!hasLastPage) {
        const { data } = initialResponse;

        if (
          !data.some((starredRepo) =>
            'repo' in starredRepo
              ? starredRepo.repo.id === repoId
              : starredRepo.id === repoId,
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
      const lastNumber = Number(lastNumberString);
      const pageNumbersToFetch = Array.from(
        { length: pagesToCheck },
        (_, i) => lastNumber - i,
      );

      const responses = await Promise.all(
        pageNumbersToFetch.map((pageNumber) =>
          octokit.rest.activity.listReposStarredByUser({
            headers: {
              Accept: 'application/vnd.github+json',
            },
            page: pageNumber,
            per_page: 100,
            username,
          }),
        ),
      );

      const ids = responses.flatMap((response) =>
        response.data.map((starredRepo) =>
          'repo' in starredRepo ? starredRepo.repo.id : starredRepo.id,
        ),
      );

      const isStarred = ids.includes(repoId);

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
  checkInstagramFollowing: userProcedure
    .input(
      z.object({
        username: instagramUsernameSchema,
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { username } }) => {
      await delay(1000);

      const campaign = PROMO_SOCIAL_DISCOUNT_CAMPAIGN;
      const action = 'INSTAGRAM_FOLLOW';
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
  checkLinkedInFollowing: userProcedure
    .input(
      z.object({
        username: linkedInUsernameSchema,
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { username } }) => {
      await delay(1000);

      const campaign = PROMO_SOCIAL_DISCOUNT_CAMPAIGN;
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
    .mutation(async ({ ctx: { viewer }, input: { username } }) => {
      await delay(1000);

      const campaign = PROMO_SOCIAL_DISCOUNT_CAMPAIGN;
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
        include: {
          projectsProfile: {
            select: {
              premium: true,
            },
          },
        },
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
      if (profile.projectsProfile?.premium) {
        return null;
      }

      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_COUPON_ID_PROD
          : PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_COUPON_ID_TEST;

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

      return await stripe.promotionCodes.create({
        coupon,
        customer: stripeCustomer,
        expires_at: threeDaysLaterUnix,
        max_redemptions: 2,
        metadata: {
          campaign: PROMO_INTERVIEWS_PREMIUM_PERK_PROJECTS_DISCOUNT_CAMPAIGN,
        },
      });
    }),
  generateOrGetSocialTasksPromoCode: userProcedure.mutation(
    async ({ ctx: { viewer } }) => {
      const userId = viewer.id;

      const tasks = await prisma.rewardsTaskCompletion.findMany({
        where: {
          campaign: PROMO_SOCIAL_DISCOUNT_CAMPAIGN,
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
          ? PROMO_SOCIAL_DISCOUNT_COUPON_ID_PROD
          : PROMO_SOCIAL_DISCOUNT_COUPON_ID_TEST;

      const [activePromoCodes, allPromoCodes] = await Promise.all([
        stripe.promotionCodes.list({
          active: true,
          coupon,
          customer: stripeCustomer,
        }),
        stripe.promotionCodes.list({
          coupon,
          customer: stripeCustomer,
        }),
      ]);

      // Return active promo code
      if (activePromoCodes.data.length > 0) {
        return activePromoCodes.data[0];
      }

      // Allow extra promo generations since some users might waste
      // the promo code on failed payments (e.g. India)
      if (
        allPromoCodes.data.length > PROMO_SOCIAL_DISCOUNT_CODE_MAX_GENERATIONS
      ) {
        throw "You've used all your attempts for generating a promo code and your last code has now expired. If you need help or have questions, feel free to contact us.";
      }

      // Generate a new promo code
      const today = new Date();
      const threeDaysLater = new Date(today.setDate(today.getDate() + 3));
      const threeDaysLaterUnix = Math.round(threeDaysLater.getTime() / 1000);

      const promoCode = await stripe.promotionCodes.create({
        coupon,
        customer: stripeCustomer,
        expires_at: threeDaysLaterUnix,
        max_redemptions: 2,
        metadata: {
          campaign: PROMO_SOCIAL_DISCOUNT_CAMPAIGN,
        },
      });

      return promoCode;
    },
  ),
  generateStudentDiscountPromoCode: userProcedure.mutation(
    async ({ ctx: { viewer } }) => {
      const profile = await prisma.profile.findFirst({
        include: {
          projectsProfile: true,
        },
        where: {
          id: viewer.id,
        },
      });

      if (!profile?.stripeCustomer) {
        return null;
      }

      if (profile.premium && profile.projectsProfile?.premium) {
        return null;
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });

      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? PROMO_STUDENT_DISCOUNT_COUPON_ID_PROD
          : PROMO_STUDENT_DISCOUNT_COUPON_ID_TEST;
      const customer = profile.stripeCustomer;

      const promotionCodes = await stripe.promotionCodes.list({
        coupon,
        customer,
      });

      // Allow 3 promo generations since some users
      // might waste the promo code on failed payments (e.g. India).
      if (
        promotionCodes.data.length >=
        PROMO_STUDENT_DISCOUNT_CODE_MAX_GENERATIONS
      ) {
        throw "You've used all your attempts for generating a promo code and your last code has now expired. If you need help or have questions, feel free to contact us.";
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
          campaign: PROMO_STUDENT_DISCOUNT_CAMPAIGN,
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

    if (profile?.stripeCustomer == null) {
      throw 'No profile or Stripe customer found';
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const customer = profile.stripeCustomer;
    const coupon =
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? PROMO_SOCIAL_DISCOUNT_COUPON_ID_PROD
        : PROMO_SOCIAL_DISCOUNT_COUPON_ID_TEST;

    const [activePromoCodes, allPromoCodes] = await Promise.all([
      stripe.promotionCodes.list({
        active: true,
        coupon,
        customer,
      }),
      stripe.promotionCodes.list({
        coupon,
        customer,
      }),
    ]);

    return {
      activePromoCode:
        activePromoCodes.data.length === 0 ? null : activePromoCodes.data[0],
      canStillGenerate:
        allPromoCodes.data.length < PROMO_SOCIAL_DISCOUNT_CODE_MAX_GENERATIONS,
    };
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

      if (profile?.stripeCustomer == null) {
        throw 'No profile or Stripe customer found';
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2023-10-16',
      });

      const customer = profile.stripeCustomer;
      const coupon =
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
          ? PROMO_STUDENT_DISCOUNT_COUPON_ID_PROD
          : PROMO_STUDENT_DISCOUNT_COUPON_ID_TEST;

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
        campaign: PROMO_SOCIAL_DISCOUNT_CAMPAIGN,
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
        gitHubUsername: z.string().trim(),
        instagramUsername: z.string().trim(),
        linkedInUsername: z.string().trim(),
        twitterUsername: z.string().trim(),
      }),
    )
    .mutation(
      async ({
        input: {
          gitHubUsername,
          instagramUsername,
          linkedInUsername,
          twitterUsername,
        },
      }) => {
        const results = await Promise.allSettled([
          (async () => {
            if (!gitHubUsername) {
              throw 'Empty GitHub username';
            }

            const res = await fetch(
              `https://github.com/${encodeURIComponent(gitHubUsername)}`,
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
          (async () => {
            try {
              // Validate inside here rather than at the query input so that
              // we can provide granular errors.
              instagramUsernameSchema.parse(instagramUsername);
            } catch (error) {
              throw (error as ZodError).issues[0].message;
            }
          })(),
        ]);

        return {
          allValid: results.every(({ status }) => status === 'fulfilled'),
          fields: {
            gitHub: results[0],
            instagram: results[3],
            linkedIn: results[1],
            twitter: results[2],
          },
        };
      },
    ),
});
