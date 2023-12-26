import Stripe from 'stripe';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router, userProcedure } from '../trpc';

import { Prisma } from '@prisma/client';

/* eslint-disable camelcase */
const studentDiscountCouponId_TEST = 'r1nhvjSn';
const studentDiscountCouponId_PROD = 'tgklHrfQ';

export const marketingRouter = router({
  generateStudentDiscount: userProcedure.mutation(async ({ ctx: { user } }) => {
    const profile = await prisma.profile.findFirst({
      where: {
        id: user.id,
      },
    });

    if (profile == null || profile?.premium || !profile?.stripeCustomer) {
      return null;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });

    const today = new Date();
    const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
    const nextThreeDaysUnix = Math.round(nextThreeDays.getTime() / 1000);

    const promotionCode = await stripe.promotionCodes.create({
      coupon:
        process.env.NODE_ENV === 'production'
          ? studentDiscountCouponId_PROD
          : studentDiscountCouponId_TEST,
      customer: profile.stripeCustomer,
      expires_at: nextThreeDaysUnix,
      max_redemptions: 1,
    });

    return {
      code: promotionCode.code,
    };
  }),
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
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint error, which is fine for us as
          // it'll be a no-op.
          if (err.code === 'P2002') {
            return 'Subscribed successfully!';
          }

          return err.message;
        }

        throw err;
      }

      return 'Subscribed successfully!';
    }),
  // Intentionally make it publicProcedure since this can be called by
  // non-logged in users and showing an error is ugly.
  // We just return `null` if not logged in.
  userPromoCodes: publicProcedure.query(async ({ ctx: { user } }) => {
    if (user == null) {
      return null;
    }

    const profile = await prisma.profile.findFirst({
      where: {
        id: user.id,
      },
    });

    const customer = profile?.stripeCustomer;

    if (profile == null || !customer) {
      return null;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2022-11-15',
    });

    const promotionCodes = await stripe.promotionCodes.list({
      active: true,
      customer,
    });

    return promotionCodes;
  }),
});
