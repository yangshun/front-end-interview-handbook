import { subHours } from 'date-fns';
import Stripe from 'stripe';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { Axiom } from '@axiomhq/js';
import { Prisma } from '@prisma/client';

const STUDENT_DISCOUNT_CAMPAIGN = 'STUDENT_DISCOUNT';
const studentDiscountCouponId_TEST = 'r1nhvjSn';
const studentDiscountCouponId_PROD = 'tgklHrfQ';
const TIME_DIFF_IN_HOURS = 2;

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN!,
});

export const marketingRouter = router({
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
      const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
      const nextThreeDaysUnix = Math.round(nextThreeDays.getTime() / 1000);

      const promotionCode = await stripe.promotionCodes.create({
        coupon,
        customer,
        expires_at: nextThreeDaysUnix,
        max_redemptions: 1,
        metadata: {
          campaign: STUDENT_DISCOUNT_CAMPAIGN,
        },
      });

      return promotionCode;
    },
  ),
  getOnlineUsers: publicProcedure.query(async () => {
    const aplQuery = "['events'] | summarize dcount(['user.fingerprint'])";

    const res = await axiom.query(aplQuery, {
      endTime: new Date().toISOString(),
      startTime: subHours(new Date(), TIME_DIFF_IN_HOURS).toISOString(),
    });

    const onlineUsers: number =
      res.buckets?.totals?.[0].aggregations?.[0].value;

    return onlineUsers ?? 0;
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

  signUpWithEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email is invalid'),
      }),
    )
    .mutation(async ({ input: { email } }) => {
      try {
        await prisma.emailSubscriber.create({
          data: {
            email,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint error, which is fine for us as
          // it'll be a no-op.
          if (error.code === 'P2002') {
            return 'Subscribed successfully!';
          }

          return error.message;
        }

        throw error;
      }

      return 'Subscribed successfully!';
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
});
