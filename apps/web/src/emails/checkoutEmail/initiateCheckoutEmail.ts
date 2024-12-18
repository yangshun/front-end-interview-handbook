import 'server-only';

import Stripe from 'stripe';

import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import { sendEmail } from '~/mailjet/sendMail';
import prisma from '~/server/prisma';

import { emailTrackRedisKey } from '../emailUtils';

import { Redis } from '@upstash/redis';

const EXPIRES_MONTH = 6;
const interviewsPremiumPerkProjectsDiscountCouponId_TEST = 'hV8qtZIX';
const interviewsPremiumPerkProjectsDiscountCouponId_PROD = 'SKcIcPgB';

function secondsFromTodayToSixMonths() {
  const today = new Date();
  const sixMonthsLater = new Date();

  sixMonthsLater.setMonth(today.getMonth() + EXPIRES_MONTH);

  const timeDifference = sixMonthsLater.getTime() - today.getTime();
  const secondsDifference = timeDifference / 1000;

  return Math.round(secondsDifference);
}

export async function sendInitiateCheckoutFirstTimeEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const initiateCheckoutFirstTimeRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.initiateCheckoutFirstTime.name,
  );
  const initiateCheckoutFirstTimeRedisValue = await redis.get(
    initiateCheckoutFirstTimeRedisKey,
  );

  // If there is no value or no SENT value, then don't send the email
  // For the email to be send, it will have SCHEDULED value
  if (
    !initiateCheckoutFirstTimeRedisValue ||
    initiateCheckoutFirstTimeRedisValue === 'SENT'
  ) {
    return;
  }

  try {
    await sendEmail({
      from: {
        email: 'yangshun@greatfrontend.com',
        name: 'Yangshun Tay',
      },
      replyTo: {
        email: 'team@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject: `Hi ${name}, this is Yangshun from GreatFrontEnd`,
      templateId: MAILJET_TEMPLATE.initiateCheckoutFirstTime.id,
      to: {
        email,
        name,
      },
      variables: {
        country: 'India', // TODO(emails): Not sure which country to pass here for the most used country
        name,
      },
    });
    await redis.set(initiateCheckoutFirstTimeRedisKey, 'SENT');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendInitiateCheckoutMultipleTimesEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const sixMonthsInSec = secondsFromTodayToSixMonths();
  const redis = Redis.fromEnv();
  const initiateCheckoutMultipleTimesRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.name,
  );

  const initiateCheckoutMultipleTimesRedisValue = await redis.get(
    initiateCheckoutMultipleTimesRedisKey,
  );

  // If there is no value or no SENT value, then don't send the email
  // For the email to be send, it will have SCHEDULED value
  if (
    !initiateCheckoutMultipleTimesRedisValue ||
    initiateCheckoutMultipleTimesRedisValue === 'SENT'
  ) {
    return;
  }

  try {
    const profile = await prisma.profile.findUnique({
      select: {
        stripeCustomer: true,
      },
      where: {
        id: userId,
      },
    });

    if (!profile?.stripeCustomer) {
      throw 'No profile found';
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });
    const today = new Date();
    const twoDaysLater = new Date(today.setDate(today.getDate() + 2));
    const twoDaysLaterUnix = Math.round(twoDaysLater.getTime() / 1000);

    // TODO(emails): Need to update with appropriate coupon
    const coupon =
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? interviewsPremiumPerkProjectsDiscountCouponId_PROD
        : interviewsPremiumPerkProjectsDiscountCouponId_TEST;

    const promoCode = await stripe.promotionCodes.create({
      coupon,
      customer: profile.stripeCustomer,
      expires_at: twoDaysLaterUnix,
      max_redemptions: 1,
      metadata: {
        campaign: 'CHECKOUT_EMAIL',
      },
    });

    if (!promoCode) {
      throw "Couldn't generate coupon";
    }
    await sendEmail({
      from: {
        email: 'hello@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject: `Act fast: ${promoCode.coupon.percent_off} off reserved just for you, ends in 48 hours!`,
      templateId: MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.id,
      to: {
        email,
        name,
      },
      // // TODO(emails): Use this promocode and percentage off variables value in the template
      variables: {
        couponCode: promoCode.code,
        name,
        percentOff: `${promoCode.coupon.percent_off}`,
      },
    });
    // Expire this after 6 months so that we can retrigger this email again
    redis.set(initiateCheckoutMultipleTimesRedisKey, 'SENT', {
      ex: sixMonthsInSec,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
