import type { ProjectsSubscriptionPlan } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import url from 'url';

import absoluteUrl from '~/lib/absoluteUrl';
import { convertCurrencyValueToStripeValue } from '~/lib/stripeUtils';

import { PROMO_FAANG_TECH_LEADS_MAX_PPP_ELIGIBLE } from '~/data/PromotionConfig';

import fetchInterviewsPricingPlanPaymentConfigLocalizedRecord from '~/components/interviews/purchase/fetchInterviewsPricingPlanPaymentConfigLocalizedRecord';
import type { InterviewsPricingPlanType } from '~/components/interviews/purchase/InterviewsPricingPlans';
import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';
import { resolvePaymentProvider } from '~/components/purchase/providers/PurchasePaymentProvider';
import { PurchasePaymentStripeProvider } from '~/components/purchase/providers/PurchasePaymentStripeProvider';
import { PurchasePaymentTazapayProvider } from '~/components/purchase/providers/PurchasePaymentTazapayProvider';
import type { PurchasePricingPlanPaymentConfigLocalized } from '~/components/purchase/PurchaseTypes';

import i18nHref from '~/next-i18nostic/src/utils/i18nHref';

type BaseCheckoutQueryParams = Readonly<{
  // Optional cancel URL if user cancels checkout.
  cancel_url?: string;
  // Two-letter ISO country code.
  country_code: string;
  // Payment provider customer ID (cus_xxxxx).
  customer_id: string;
  // First promoter tracking ID.
  first_promoter_tid?: string;
  // Locale
  locale: string;
  // Email to send the receipt to.
  receipt_email?: string;
}>;

export type CheckoutProductDomain = 'interviews' | 'projects';

type InterviewsCheckoutQueryParams = BaseCheckoutQueryParams &
  Readonly<{
    plan_type: InterviewsPricingPlanType;
    product_domain: 'interviews';
  }>;

type ProjectsCheckoutQueryParams = BaseCheckoutQueryParams &
  Readonly<{
    plan_type: ProjectsSubscriptionPlan;
    product_domain: 'projects';
  }>;

export type CheckoutQueryParams =
  | InterviewsCheckoutQueryParams
  | ProjectsCheckoutQueryParams;

// This API exists as a standard API route because the Stripe npm module
// uses some Node.js APIs which are not available in Edge runtimes.
// So we separate out the checkout session generation functionality into
// two parts:
//  1. Part that requires next/server (available on middlewares and Edge runtime) like geolocation to get the user location and convert it into a currency.
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
    customer_id: customerId,
    first_promoter_tid,
    locale,
    plan_type: planType,
    product_domain: productDomain,
    receipt_email: receiptEmail,
  } = req.query as CheckoutQueryParams;
  const firstPromoterTrackingId =
    first_promoter_tid === 'undefined' ? undefined : first_promoter_tid;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });

  const planPaymentConfig: PurchasePricingPlanPaymentConfigLocalized =
    await (async () => {
      switch (productDomain) {
        case 'projects': {
          const data =
            await fetchProjectsPricingPlanPaymentConfigLocalizedRecord(
              countryCode,
            );

          return data[planType];
        }
        case 'interviews': {
          const data =
            await fetchInterviewsPricingPlanPaymentConfigLocalizedRecord(
              countryCode,
            );

          return data[planType];
        }
      }
    })();

  if (planPaymentConfig == null) {
    return res.status(401).send({
      error: {
        message: `Invalid or non-existent plan type: ${planType}`,
      },
      success: false,
    });
  }

  const { currency, unitCostCurrency } = planPaymentConfig;
  const unitAmountInStripeFormat = convertCurrencyValueToStripeValue(
    unitCostCurrency.withPPP.after,
    currency,
  );

  if (planPaymentConfig.checkoutMode === 'subscription') {
    return await processSubscriptionPlan(
      req,
      res,
      customerId,
      stripe,
      planType,
      planPaymentConfig,
      currency,
      unitAmountInStripeFormat,
      locale,
      firstPromoterTrackingId,
    );
  }

  if (planPaymentConfig.checkoutMode === 'payment') {
    return await processOneTimePlan(
      req,
      res,
      customerId,
      planType,
      planPaymentConfig,
      currency,
      unitAmountInStripeFormat,
      locale,
      countryCode,
      receiptEmail,
      firstPromoterTrackingId,
    );
  }
}

async function processSubscriptionPlan(
  req: NextApiRequest,
  res: NextApiResponse,
  stripeCustomerId: string,
  stripe: Stripe,
  planType: string,
  planPaymentConfig: PurchasePricingPlanPaymentConfigLocalized,
  currency: string,
  unitAmountInCurrency: number,
  locale: string,
  firstPromoterTrackingId?: string,
) {
  const { productId, recurring, urls } = planPaymentConfig;
  const queryParams = req.query as CheckoutQueryParams;

  const priceObject = await stripe.prices.create({
    currency,
    product: productId,
    recurring: {
      interval: recurring!.interval!,
      interval_count: recurring?.count,
    },
    unit_amount: unitAmountInCurrency,
  });

  const { origin } = absoluteUrl(req);

  const cancelUrl = (() => {
    const baseCancelUrl = new URL(
      queryParams.cancel_url ||
        origin + url.format(i18nHref(urls.cancel, locale)),
    );

    baseCancelUrl.searchParams.set('checkout_cancel', '1');
    baseCancelUrl.searchParams.set('plan', planType);

    return baseCancelUrl.toString();
  })();
  const successUrl = (() => {
    const baseSuccessUrl = new URL(
      origin + url.format(i18nHref(urls.success, locale)),
    );

    baseSuccessUrl.searchParams.set('plan', planType);

    return baseSuccessUrl.toString();
  })();

  const pppEligibleForFTLBundle =
    planPaymentConfig.conversionFactor <
    PROMO_FAANG_TECH_LEADS_MAX_PPP_ELIGIBLE;

  const session = await stripe.checkout.sessions.create({
    allow_promotion_codes: planPaymentConfig.allowPromoCode,
    cancel_url: cancelUrl,
    client_reference_id: firstPromoterTrackingId || 'fp_' + String(Date.now()),
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceObject.id,
        quantity: 1,
      },
    ],
    metadata:
      planPaymentConfig.giveFTL && pppEligibleForFTLBundle
        ? {
            ftl: 'true',
          }
        : undefined,
    mode: 'subscription',
    success_url: successUrl,
  });

  return res.json({
    payload: {
      id: session.id,
      url: session.url,
    },
    success: true,
  });
}

async function processOneTimePlan(
  req: NextApiRequest,
  res: NextApiResponse,
  customerId: string,
  planType: string,
  planPaymentConfig: PurchasePricingPlanPaymentConfigLocalized,
  currency: string,
  unitAmountInCurrency: number,
  locale: string,
  countryCode: string,
  receiptEmail?: string,
  firstPromoterTrackingId?: string,
) {
  const { origin } = absoluteUrl(req);
  const queryParams = req.query as CheckoutQueryParams;
  const { productId, urls } = planPaymentConfig;

  const cancelUrl = (() => {
    const baseCancelUrl = new URL(
      queryParams.cancel_url ||
        origin + url.format(i18nHref(urls.cancel, locale)),
    );

    baseCancelUrl.searchParams.set('checkout_cancel', '1');
    baseCancelUrl.searchParams.set('plan', planType);

    return baseCancelUrl.toString();
  })();
  const successUrl = (() => {
    const baseSuccessUrl = new URL(
      origin + url.format(i18nHref(urls.success, locale)),
    );

    baseSuccessUrl.searchParams.set('plan', planType);

    return baseSuccessUrl.toString();
  })();

  const pppEligibleForFTLBundle =
    planPaymentConfig.conversionFactor <
    PROMO_FAANG_TECH_LEADS_MAX_PPP_ELIGIBLE;

  const paymentProvider = resolvePaymentProvider(
    planPaymentConfig,
    countryCode,
  );

  const session =
    paymentProvider === 'stripe'
      ? await PurchasePaymentStripeProvider.createOneTimePlanCheckoutSession({
          allowPromoCode: planPaymentConfig.allowPromoCode,
          cancelUrl,
          currency,
          customerId,
          firstPromoterTrackingId,
          metadata:
            planPaymentConfig.giveFTL && pppEligibleForFTLBundle
              ? {
                  ftl: 'true',
                }
              : undefined,
          productId,
          receiptEmail,
          successUrl,
          unitAmountInCurrency,
        })
      : await PurchasePaymentTazapayProvider.createOneTimePlanCheckoutSession({
          cancelUrl,
          currency,
          customerId,
          firstPromoterTrackingId,
          items: [
            {
              amount: unitAmountInCurrency,
              // TODO: Handle this data in a better way.
              // May be get it from pricing plan config
              description:
                'Full access to all questions and high quality solutions. Filter questions by company. Free continuous interview question and content updates.',
              name: 'GreatFrontEnd Interviews Premium',
              quantity: 1,
            },
          ],
          metadata:
            planPaymentConfig.giveFTL && pppEligibleForFTLBundle
              ? {
                  ftl: 'true',
                }
              : undefined,
          // Remove card payment method for India
          // Because it has lower amount than other payment methods because of GST and it looks odd
          removePaymentMethods: countryCode === 'IN' ? ['card'] : [],
          successUrl,
          // TODO: Handle this data in a better way.
          // May be get it from pricing plan config
          transactionDescription: 'GreatFrontEnd Interviews Premium',
          unitAmountInCurrency,
        });

  return res.json({
    payload: {
      id: session.id,
      url: session.url,
    },
    success: true,
  });
}
