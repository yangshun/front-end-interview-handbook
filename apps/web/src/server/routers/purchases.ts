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

export const purchasesRouter = router({
  billingPortal: userProcedure.mutation(async ({ ctx: { user, req } }) => {
    const { origin } = absoluteUrl(req);

    const { stripeCustomer: stripeCustomerId } =
      await prisma.profile.findFirstOrThrow({
        select: {
          stripeCustomer: true,
        },
        where: {
          id: user.id,
        },
      });

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId!,
      return_url: `${origin}/profile/billing`,
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
