import Stripe from 'stripe';

import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetUtils';
import prisma from '~/server/prisma';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { EmailsItemConfigCheckoutFirstTime } from './EmailsItemConfigCheckoutFirstTime';
import { EmailsItemConfigCheckoutMultipleTimes } from './EmailsItemConfigCheckoutMultipleTimes';

const THREE_MONTHS_IN_SECS = 3 * 30 * 24 * 3600;
const interviewsEmailIncentiveDiscountCouponId_TEST = '7Yy6rf7h';
const interviewsEmailIncentiveDiscountCouponId_PROD = 'rAbxYcFA';

async function customerHasFailedRecentFailedPayment(
  stripe: Stripe,
  customerId: string,
): Promise<boolean> {
  const today = new Date();

  const paymentIntents = await stripe.paymentIntents.list({
    customer: customerId,
  });

  if (paymentIntents.data.length === 0) {
    return false;
  }

  const lastPaymentIntent = paymentIntents.data[0];

  const oneDayAgo = new Date(
    // 1 day
    today.getTime() - 24 * 60 * 60 * 1000,
  );

  // Has a payment failure one day ago
  return (
    lastPaymentIntent.last_payment_error != null &&
    lastPaymentIntent.created > oneDayAgo.getTime() / 1000
  );
}

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
      return { reason: 'PREMIUM_USER', sent: false };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const hasRecentFailedPayment = await customerHasFailedRecentFailedPayment(
      stripe,
      profile.stripeCustomer,
    );

    if (hasRecentFailedPayment) {
      return { reason: 'FAILED_PAYMENT_RECENTLY', sent: false };
    }

    const props = { countryCode, hook: Math.floor(Math.random() * 10), name };

    return await sendEmailItemWithChecks(
      {
        email,
        name,
      },
      {
        emailItemConfig: {
          config: EmailsItemConfigCheckoutFirstTime,
          props,
        },
        userId,
      },
    );
  } catch (error) {
    return { error: getErrorMessage(error), reason: 'ERROR', sent: false };
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
      return { reason: 'PREMIUM_USER', sent: false };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16',
    });

    const hasRecentFailedPayment = await customerHasFailedRecentFailedPayment(
      stripe,
      profile.stripeCustomer,
    );

    if (hasRecentFailedPayment) {
      return { reason: 'FAILED_PAYMENT_RECENTLY', sent: false };
    }

    const today = new Date();
    const promoCodeExpiryDays = 2;
    const expiresAtTimestamp = new Date(
      today.setDate(today.getDate() + promoCodeExpiryDays),
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
        expiryDays: promoCodeExpiryDays,
        percentOff: promoCode.coupon.percent_off ?? 0,
      },
      name,
    };

    return await sendEmailItemWithChecks(
      {
        email,
        name,
      },
      {
        emailItemConfig: {
          config: EmailsItemConfigCheckoutMultipleTimes,
          props,
        },
        redis: {
          opts: {
            // Expire this after 6 months so that we can resend this email again
            ex: THREE_MONTHS_IN_SECS,
          },
        },
        userId,
      },
    );
  } catch (error) {
    return { error: getErrorMessage(error), reason: 'ERROR', sent: false };
  }
}
