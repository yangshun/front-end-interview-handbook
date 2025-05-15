import { Redis } from '@upstash/redis';
import Stripe from 'stripe';
import { z } from 'zod';

import { convertStripeValueToCurrencyValue } from '~/lib/stripeUtils';

import countryNames from '~/data/countryCodesToNames.json';

import fetchInterviewsPricingPlanPaymentConfigLocalizedRecord from '~/components/interviews/purchase/fetchInterviewsPricingPlanPaymentConfigLocalizedRecord';
import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

type CountryCode = keyof typeof countryNames;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const productDomainToProductIDs = {
  INTERVIEWS: process.env.STRIPE_PRODUCT_ID_INTERVIEWS!,
  PROJECTS: process.env.STRIPE_PRODUCT_ID_PROJECTS!,
} as const;

export const purchasesRouter = router({
  activeSubscription: userProcedure
    .input(
      z.object({
        domain: z.enum(['INTERVIEWS', 'PROJECTS']),
      }),
    )
    .query(async ({ ctx: { viewer }, input: { domain } }) => {
      const { stripeCustomer: stripeCustomerId } =
        await prisma.profile.findFirstOrThrow({
          select: {
            stripeCustomer: true,
          },
          where: {
            id: viewer.id,
          },
        });

      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomerId!,
      });

      const productID = productDomainToProductIDs[domain];

      const activeSubscription = subscriptions.data.find(
        (subscription) =>
          subscription.items.data[0]?.plan.product === productID,
      );

      return activeSubscription
        ? {
            cancelAt: activeSubscription.cancel_at,
            cancelAtPeriodEnd: activeSubscription.cancel_at_period_end,
            canceledAt: activeSubscription.canceled_at,
            currentPeriodEnd: activeSubscription.current_period_end,
            status: activeSubscription.status,
          }
        : null;
    }),
  billingPortalSessionUrl: userProcedure
    .input(
      z.object({
        returnUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx: { viewer }, input: { returnUrl } }) => {
      const { stripeCustomer: stripeCustomerId } =
        await prisma.profile.findFirstOrThrow({
          select: {
            stripeCustomer: true,
          },
          where: {
            id: viewer.id,
          },
        });

      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId!,
        return_url: returnUrl,
      });

      return session.url;
    }),
  interviewsPlans: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx: { req }, input: country }) => {
      const countryCode = (country ??
        req.cookies.country ??
        'US') as CountryCode;

      const plans =
        await fetchInterviewsPricingPlanPaymentConfigLocalizedRecord(
          countryCode,
        );

      return {
        country: {
          code: countryCode,
          name: countryNames[countryCode as CountryCode],
        },
        plans,
      };
    }),
  lastPaymentError: userProcedure.query(async ({ ctx }) => {
    // Set headers to disable caching
    ctx.res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    ctx.res.setHeader('Pragma', 'no-cache');
    ctx.res.setHeader('Expires', '0');

    const userProfile = await prisma.profile.findFirst({
      select: {
        stripeCustomer: true,
      },
      where: {
        id: ctx.viewer.id,
      },
    });

    // A Stripe customer hasn't been created yet.
    if (userProfile?.stripeCustomer == null) {
      return null;
    }

    const { stripeCustomer: stripeCustomerId } = userProfile;

    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeCustomerId,
    });

    if (paymentIntents.data.length === 0) {
      return null;
    }

    const lastPaymentIntent = paymentIntents.data[0];

    if (lastPaymentIntent.last_payment_error == null) {
      return null;
    }

    return {
      code: lastPaymentIntent.last_payment_error.code,
      declineCode_DO_NOT_DISPLAY_TO_USER:
        lastPaymentIntent.last_payment_error.decline_code,
      message: lastPaymentIntent.last_payment_error.message,
    };
  }),
  lastSuccessfulPaymentThatHasntBeenLogged: userProcedure.query(
    async ({ ctx }) => {
      const userProfile = await prisma.profile.findFirst({
        select: {
          stripeCustomer: true,
        },
        where: {
          id: ctx.viewer.id,
        },
      });

      // No Stripe customer or non-existent user
      if (userProfile?.stripeCustomer == null) {
        return null;
      }

      const { stripeCustomer: stripeCustomerId } = userProfile;

      const oneDayInSeconds = 24 * 3600;
      const oneDayAgo = Math.floor(Date.now() / 1000) - oneDayInSeconds;
      const paymentIntents = await stripe.paymentIntents.list({
        created: {
          gte: oneDayAgo,
        },
        customer: stripeCustomerId,
      });

      const successfulPaymentIntents = paymentIntents.data.filter(
        (paymentIntent) => paymentIntent.status === 'succeeded',
      );

      if (successfulPaymentIntents.length === 0) {
        return null;
      }

      const lastSuccessfulPaymentIntent = successfulPaymentIntents[0];

      const redis = Redis.fromEnv();
      const paymentKey = `purchases:${lastSuccessfulPaymentIntent.id}`;
      const paymentAlreadyLogged = await redis.get(paymentKey);

      if (paymentAlreadyLogged) {
        return null;
      }

      const { amount, currency } = lastSuccessfulPaymentIntent;

      // Prematurely setting the redis key to true to prevent duplicate logging
      // Will be inaccurate it the client doesn't log, but should be rare
      await redis.set(paymentKey, true, {
        ex: oneDayInSeconds,
      });

      return {
        amount: convertStripeValueToCurrencyValue(amount, currency),
        currency,
      };
    },
  ),
  latestCheckoutSessionMetadata: userProcedure.query(async ({ ctx }) => {
    const userProfile = await prisma.profile.findFirst({
      select: {
        stripeCustomer: true,
      },
      where: {
        id: ctx.viewer.id,
      },
    });

    // A Stripe customer hasn't been created yet.
    if (userProfile?.stripeCustomer == null) {
      return null;
    }

    const { stripeCustomer: stripeCustomerId } = userProfile;

    const sessions = await stripe.checkout.sessions.list({
      // Get the most recent session
      customer: stripeCustomerId,
      limit: 1,
    });

    if (!sessions.data || sessions.data.length === 0) {
      return null;
    }

    return sessions.data[0].metadata;
  }),
  projectsPlans: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx: { req }, input: country }) => {
      const countryCode = (country ??
        req.cookies.country ??
        'US') as CountryCode;

      const plans =
        await fetchProjectsPricingPlanPaymentConfigLocalizedRecord(countryCode);

      return {
        country: {
          code: countryCode,
          name: countryNames[countryCode as CountryCode],
        },
        plans,
      };
    }),
  recent: publicProcedure.query(async () => {
    const charges = await stripe.charges.search({
      limit: 10,
      query: "status:'succeeded'",
    });

    const purchases = charges.data.map((charge) => {
      const countryCode = (charge.billing_details.address?.country ??
        'US') as keyof typeof countryNames;

      return {
        country: countryNames[countryCode],
      };
    });

    return purchases;
  }),
});
