import 'server-only';

import Stripe from 'stripe';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';
import prisma from '~/server/prisma';

import EmailsTemplateCheckoutFirstTime from './EmailsTemplateCheckoutFirstTime';
import EmailsTemplateCheckoutMultipleTimes from './EmailsTemplateCheckoutMultipleTimes';

const SIX_MONTHS_IN_SECS = 6 * 30 * 24 * 3600;
const interviewsPremiumPerkProjectsDiscountCouponId_TEST = 'hV8qtZIX';
const interviewsPremiumPerkProjectsDiscountCouponId_PROD = 'SKcIcPgB';

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
    await sendReactEmailWithChecks(
      { emailKey: 'INTERVIEWS_CHECKOUT_FIRST_TIME', userId },
      {
        component: (
          <EmailsTemplateCheckoutFirstTime
            countryCode={countryCode}
            name={name}
          />
        ),
        from: {
          email: 'yangshun@greatfrontend.com',
          name: 'Yangshun from GreatFrontEnd',
        },
        replyTo: {
          email: 'yangshun@greatfrontend.com',
          name: 'Yangshun Tay',
        },
        subject: `Hi ${name ?? 'there'}, this is Yangshun from GreatFrontEnd`,
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

    // Eagerly generate even if user has been sent before
    // because checks should have been done even before this
    // function was called, and even if users get an extra coupon
    // it's not a big deal
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

    await sendReactEmailWithChecks(
      {
        emailKey: 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES',
        opts: {
          // Expire this after 6 months so that we can retrigger this email again
          ex: SIX_MONTHS_IN_SECS,
        },
        userId,
      },
      {
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
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
