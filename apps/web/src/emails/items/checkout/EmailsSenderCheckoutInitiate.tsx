import 'server-only';

import Stripe from 'stripe';

import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';
import prisma from '~/server/prisma';

import EmailsTemplateCheckoutFirstTime from './EmailsTemplateCheckoutFirstTime';
import EmailsTemplateCheckoutMultipleTimes from './EmailsTemplateCheckoutMultipleTimes';
import { emailTrackRedisKey } from '../../EmailsUtils';

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
    'checkout_first_time',
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
    await sendReactEmail({
      // TODO(emails): Not sure which country to pass here for the most used country
      component: (
        <EmailsTemplateCheckoutFirstTime mostUsedCountry="India" name={name} />
      ),
      from: {
        email: 'yangshun@greatfrontend.com',
        name: 'Yangshun from GreatFrontEnd',
      },
      replyTo: {
        email: 'team@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject: `Hi ${name}, this is Yangshun from GreatFrontEnd`,
      to: {
        email,
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
    'checkout_multiples_times',
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
    const daysInFuture = 2;
    const twoDaysLater = new Date(
      today.setDate(today.getDate() + daysInFuture),
    );
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

    await sendReactEmail({
      component: (
        <EmailsTemplateCheckoutMultipleTimes
          coupon={{
            code: promoCode.code,
            percentOff: promoCode.coupon.percent_off ?? 0,
          }}
          name={name}
        />
      ),
      from: {
        email: 'hello@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject: `Act fast: ${promoCode.coupon.percent_off} off reserved just for you, ends in ${daysInFuture * 24} hours!`,
      to: {
        email,
        name,
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
