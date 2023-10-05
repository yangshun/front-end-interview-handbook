import Stripe from 'stripe';
import { z } from 'zod';

import prisma from '~/server/prisma';

import { publicProcedure, router } from '../trpc';

import { Prisma } from '@prisma/client';

export const marketingRouter = router({
  generateStudentDiscount: publicProcedure.mutation(
    async ({ ctx: { user } }) => {
      if (!user) {
        return null;
      }

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

      const testPromoCode = 'r1nhvjSn';
      const prodPromoCode = 'tgklHrfQ';
      const promotionCode = await stripe.promotionCodes.create({
        coupon:
          process.env.NODE_ENV === 'production' ? prodPromoCode : testPromoCode,
        customer: profile.stripeCustomer,
        expires_at: nextThreeDaysUnix,
        max_redemptions: 1,
      });

      return {
        code: promotionCode.code,
      };
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
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // Unique constraint error, which is fine for us as
          // it'll be a no-op.
          if (err.code === 'P2002') {
            return 'Subscribed successfully!';
          }

          return 'An error occurred';
        }
      }

      return 'Subscribed successfully!';
    }),
});
