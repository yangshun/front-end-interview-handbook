import Stripe from 'stripe';
import { z } from 'zod';

import absoluteUrl from '~/lib/absoluteUrl';

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
    .query(async ({ input: { domain }, ctx: { viewer } }) => {
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
  billingPortal: userProcedure
    .input(
      z.object({
        returnUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ input: { returnUrl }, ctx: { viewer, req } }) => {
      const { origin } = absoluteUrl(req);

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
        return_url: returnUrl || `${origin}/profile/billing`,
      });

      return session.url;
    }),
  interviewsPlans: publicProcedure
    .input(z.string().optional())
    .query(async ({ input: country, ctx: { req } }) => {
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
  lastPaymentError: userProcedure.query(async ({ ctx: { viewer } }) => {
    const userProfile = await prisma.profile.findFirst({
      select: {
        stripeCustomer: true,
      },
      where: {
        id: viewer.id,
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

    if (lastPaymentIntent.last_payment_error != null) {
      return {
        code: lastPaymentIntent.last_payment_error.code,
        declineCode_DO_NOT_DISPLAY_TO_USER:
          lastPaymentIntent.last_payment_error.decline_code,
        message: lastPaymentIntent.last_payment_error.message,
      };
    }

    return null;
  }),
  projectsPlans: publicProcedure
    .input(z.string().optional())
    .query(async ({ input: country, ctx: { req } }) => {
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
