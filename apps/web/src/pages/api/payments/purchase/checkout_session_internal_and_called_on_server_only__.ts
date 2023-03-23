import type { NextApiRequest, NextApiResponse } from 'next';
import absoluteUrl from 'next-absolute-url';
import Stripe from 'stripe';

import { normalizeCurrencyValue } from '~/lib/stripeUtils';

import type { PricingPlanDetails, PricingPlanType } from '~/data/PricingPlans';

import fetchLocalizedPlanPricing from '~/components/pricing/fetchLocalizedPlanPricing';

import logMessage from '~/logging/logMessage';

const productId = process.env.STRIPE_MAIN_PRODUCT_ID;

export type QueryParams = {
  // Two-letter ISO country code.
  country_code: string;
  first_promoter_tid?: string;
  plan_type: PricingPlanType;
  receipt_email?: string;
  stripe_customer_id: string;
};

// This API exists as a standard API route because the Stripe npm module
// uses some Node.js APIs which are not available in Edge runtimes.
// So we separate out the checkout session generation functionality into
// two parts:
//  1. Part that requires next/server (available on middlewares and Edge runtime) like geo location to get the user location and convert it into a currency.
//  2. Part that requires Node.js APIs, the generation of the checkout session (this file).

// This API is secret and should only be called on the server. Why? Because we want
// to make it harder for scammers to spoof the country code and check out via a currency
// and price that they don't belong to and pay a lower price than they deserve.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    country_code: countryCode,
    first_promoter_tid: firstPromoterTrackingId,
    stripe_customer_id: stripeCustomerId,
    receipt_email: receiptEmail,
    plan_type: planType,
  } = req.query as QueryParams;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
  });

  try {
    logMessage({
      level: 'info',
      message: `Attempting to generate pricing plan for ${countryCode}`,
      userIdentifier: stripeCustomerId,
    });

    const data = await fetchLocalizedPlanPricing(countryCode);

    const planDetails = data[planType];

    if (planDetails == null) {
      return res.status(401).send({
        error: {
          message: `Invalid or non-existent plan type: ${planType}`,
        },
        success: false,
      });
    }

    const { currency, unitCostLocalizedInCurrency } = planDetails;
    const unitAmountInStripeFormat = normalizeCurrencyValue(
      unitCostLocalizedInCurrency,
      currency,
    );

    if (planDetails.checkoutMode === 'subscription') {
      return await processSubscriptionPlan(
        req,
        res,
        stripeCustomerId,
        stripe,
        planDetails,
        currency,
        unitAmountInStripeFormat,
        firstPromoterTrackingId,
      );
    }

    if (planDetails.checkoutMode === 'payment') {
      return await processOneTimePlan(
        req,
        res,
        stripeCustomerId,
        stripe,
        planDetails,
        currency,
        unitAmountInStripeFormat,
        receiptEmail,
        firstPromoterTrackingId,
      );
    }
  } catch (err) {
    logMessage({
      level: 'error',
      message: `Error generating pricing plan for ${countryCode}`,
      userIdentifier: stripeCustomerId,
    });
    throw err;
  }
}

function checkoutSessionUrls(req: NextApiRequest, plan: PricingPlanDetails) {
  const { origin } = absoluteUrl(req);
  const { planType } = plan;

  return {
    cancelUrl: `${origin}/pricing?cancel=1&plan=${planType}`,
    successUrl: `${origin}/payment/success?plan=${planType}`,
  };
}

async function processSubscriptionPlan(
  req: NextApiRequest,
  res: NextApiResponse,
  stripeCustomerId: string,
  stripe: Stripe,
  plan: PricingPlanDetails,
  currency: string,
  unitAmountInCurrency: number,
  firstPromoterTrackingId?: string,
) {
  const { priceType, recurring } = plan;

  let priceObject: Stripe.Price | null = null;

  // Only reuse price if in USD since it's our stable value.
  if (currency === 'usd') {
    const prices = await stripe.prices.search({
      query: `active:"true"
          AND product:"${productId}"
          AND currency:"${currency}"
          AND type:"${priceType}"`,
    });

    priceObject =
      prices.data.find(
        (priceItem) =>
          priceItem.recurring?.interval === recurring?.interval &&
          priceItem.recurring?.interval_count === recurring?.count,
      ) ?? null;
  }

  if (priceObject == null) {
    console.info(
      `Creating new price for ${recurring?.count} ${recurring?.interval} in ${currency}.`,
    );
    // No price found, creating new price.
    priceObject = await stripe.prices.create({
      currency,
      product: productId,
      recurring: {
        interval: recurring!.interval!,
        interval_count: recurring?.count,
      },
      unit_amount: unitAmountInCurrency,
    });
  } else {
    console.info(
      `Found existing price for ${recurring?.count} ${recurring?.interval} in ${currency}`,
      priceObject,
    );
  }

  const priceIdToUse: string = priceObject.id;

  const { cancelUrl, successUrl } = checkoutSessionUrls(req, plan);
  const session = await stripe.checkout.sessions.create({
    // Only allow promo code for annual for now.
    allow_promotion_codes: plan.planType === 'annual',
    cancel_url: cancelUrl,
    client_reference_id: firstPromoterTrackingId || 'fp_' + String(Date.now()),
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceIdToUse,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
  });

  return res.json({
    payload: {
      id: session.id,
    },
    success: true,
  });
}

async function processOneTimePlan(
  req: NextApiRequest,
  res: NextApiResponse,
  stripeCustomerId: string,
  stripe: Stripe,
  plan: PricingPlanDetails,
  currency: string,
  unitAmountInCurrency: number,
  receiptEmail?: string,
  firstPromoterTrackingId?: string,
) {
  const { cancelUrl, successUrl } = checkoutSessionUrls(req, plan);
  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: true,
    cancel_url: cancelUrl,
    client_reference_id: firstPromoterTrackingId || 'fp_' + String(Date.now()),
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          currency,
          product: productId,
          unit_amount: unitAmountInCurrency,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      receipt_email: receiptEmail ?? undefined,
    },
    success_url: successUrl,
  });

  return res.json({
    payload: {
      id: session.id,
    },
    success: true,
  });
}
