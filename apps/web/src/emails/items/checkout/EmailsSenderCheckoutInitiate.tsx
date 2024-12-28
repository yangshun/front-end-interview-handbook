import 'server-only';

import Stripe from 'stripe';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetClient';
import prisma from '~/server/prisma';

import { EmailsItemConfigCheckoutFirstTime } from './EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './EmailsItemConfigCheckoutMultipleTimes';

const SIX_MONTHS_IN_SECS = 6 * 30 * 24 * 3600;
const interviewsEmailIncentiveDiscountCouponId_TEST = '7Yy6rf7h';
const interviewsEmailIncentiveDiscountCouponId_PROD = 'rAbxYcFA';

export async function sendInitiateCheckoutFirstTimeEmail({
  countryCode,
  name,
  email,
  userId,
}: Readonly<{
  countryCode: string | null;
  email: string;
  name: string | null;
  userId: string;
}>) {
  const props = { countryCode, name };

  try {
    await sendReactEmailWithChecks(
      {
        emailItemConfig: EmailsItemConfigCheckoutFirstTime,
        emailItemConfigProps: props,
        userId,
      },
      {
        replyTo: {
          email: 'yangshun@greatfrontend.com',
          name: 'Yangshun Tay',
        },
        to: {
          email,
          name,
        },
      },
    );
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
  name: string | null;
  userId: string;
}>) {
  try {
    const profile = await prisma.profile.findUnique({
      select: {
        premium: true,
        stripeCustomer: true,
      },
      where: {
        id: userId,
      },
    });

    if (!profile?.stripeCustomer) {
      throw 'No profile found';
    }

    if (profile.premium) {
      return;
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });
    const today = new Date();
    const expiryDays = 2;
    const expiresAtTimestamp = new Date(
      today.setDate(today.getDate() + expiryDays),
    );
    const expiresAtTimestampUnix = Math.round(
      expiresAtTimestamp.getTime() / 1000,
    );

    const coupon =
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
        ? interviewsEmailIncentiveDiscountCouponId_PROD
        : interviewsEmailIncentiveDiscountCouponId_TEST;

    // Eagerly generate even if user has been sent before
    // because checks should have been done even before this
    // function was called. Even if users get an extra coupon
    // it's not a big deal
    const promoCode = await stripe.promotionCodes.create({
      coupon,
      customer: profile.stripeCustomer,
      expires_at: expiresAtTimestampUnix,
      max_redemptions: 2,
      metadata: {
        campaign: 'INTERVIEWS_EMAIL_INCENTIVE',
      },
    });

    if (promoCode == null) {
      throw "Couldn't generate coupon";
    }

    const props = {
      coupon: {
        code: promoCode.code,
        expiryDays,
        percentOff: promoCode.coupon.percent_off ?? 0,
      },
      name,
    };

    await sendReactEmailWithChecks(
      {
        emailItemConfig: EmailsItemConfigCheckoutMultipleTimes,
        emailItemConfigProps: props,
        opts: {
          // Expire this after 6 months so that we can resend this email again
          ex: SIX_MONTHS_IN_SECS,
        },
        userId,
      },
      {
        to: {
          email,
          name,
        },
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
