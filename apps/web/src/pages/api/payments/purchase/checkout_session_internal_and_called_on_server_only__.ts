import type { ProjectsSubscriptionPlan } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import absoluteUrl from '~/lib/absoluteUrl';
import { convertCurrencyValueToStripeValue } from '~/lib/stripeUtils';

import { PROMO_FAANG_TECH_LEADS_MAX_PPP_ELIGIBLE } from '~/data/PromotionConfig';

import fetchInterviewsPricingPlanPaymentConfigLocalizedRecord from '~/components/interviews/purchase/fetchInterviewsPricingPlanPaymentConfigLocalizedRecord';
import type { InterviewsPricingPlanType } from '~/components/interviews/purchase/InterviewsPricingPlans';
import fetchProjectsPricingPlanPaymentConfigLocalizedRecord from '~/components/projects/purchase/fetchProjectsPricingPlanPaymentConfigLocalizedRecord';
import { PurchasePaymentStripeProvider } from '~/components/purchase/providers/PurchasePaymentStripeProvider';
import { PurchasePaymentTazapayProvider } from '~/components/purchase/providers/PurchasePaymentTazapayProvider';
import { getDiscountedPrice } from '~/components/purchase/PurchasePricingUtils';
import type {
  PurchasePaymentProvider,
  PurchasePricingPlanPaymentConfigLocalized,
} from '~/components/purchase/PurchaseTypes';

type BaseCheckoutQueryParams = Readonly<{
  // Optional cancel URL if user cancels checkout.
  cancel_url?: string;
  // Two-letter ISO country code.
  country_code: string;
  // Payment provider customer ID (cus_xxxxx).
  customer_id: string;
  // First promoter tracking ID.
  first_promoter_tid?: string;
  // Payment provider to be use for the checkout session.
  payment_provider: string;
  // Email to send the receipt to.
  receipt_email?: string;
  // Promo code id used for the checkout session. Only used by Tazapay
  stripe_promo_code_id?: string;
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
    payment_provider: paymentProvider,
    plan_type: planType,
    product_domain: productDomain,
    receipt_email: receiptEmail,
    stripe_promo_code_id: stripePromoCodeId,
  } = req.query as CheckoutQueryParams;
  const firstPromoterTrackingId =
    first_promoter_tid === 'undefined' ? undefined : first_promoter_tid;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });

  let promoCodeData: Stripe.PromotionCode | null = null;

  if (stripePromoCodeId && paymentProvider === 'tazapay') {
    try {
      const promoCode = await stripe.promotionCodes.retrieve(stripePromoCodeId);

      if (promoCode) {
        promoCodeData = promoCode;
      }
    } catch (error) {
      console.error('Error retrieving promo code:', error);
    }
  }

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
  const discountedPrice =
    promoCodeData && paymentProvider === 'tazapay'
      ? getDiscountedPrice({
          amountOff: promoCodeData?.coupon.amount_off,
          percentOff: promoCodeData?.coupon.percent_off,
          price: unitCostCurrency.withPPP.after,
        })
      : unitCostCurrency.withPPP.after;

  const unitAmountInStripeFormat = convertCurrencyValueToStripeValue(
    discountedPrice,
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
      firstPromoterTrackingId,
    );
  }

  if (planPaymentConfig.checkoutMode === 'payment') {
    return await processOneTimePlan(
      req,
      res,
      paymentProvider as PurchasePaymentProvider,
      customerId,
      planType,
      planPaymentConfig,
      currency,
      unitAmountInStripeFormat,
      countryCode,
      stripePromoCodeId,
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
      queryParams.cancel_url || origin + urls.cancel,
    );

    baseCancelUrl.searchParams.set('checkout_cancel', '1');
    baseCancelUrl.searchParams.set('plan', planType);

    return baseCancelUrl.toString();
  })();
  const successUrl = (() => {
    const baseSuccessUrl = new URL(origin + urls.success);

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
  paymentProvider: PurchasePaymentProvider,
  customerId: string,
  planType: string,
  planPaymentConfig: PurchasePricingPlanPaymentConfigLocalized,
  currency: string,
  unitAmountInCurrency: number,
  countryCode: string,
  stripePromoCodeId?: string,
  receiptEmail?: string,
  firstPromoterTrackingId?: string,
) {
  const { origin } = absoluteUrl(req);
  const queryParams = req.query as CheckoutQueryParams;
  const { productId, urls } = planPaymentConfig;

  const cancelUrl = (() => {
    const baseCancelUrl = new URL(
      queryParams.cancel_url || origin + urls.cancel,
    );

    baseCancelUrl.searchParams.set('checkout_cancel', '1');
    baseCancelUrl.searchParams.set('plan', planType);

    return baseCancelUrl.toString();
  })();
  const successUrl = (() => {
    const baseSuccessUrl = new URL(origin + urls.success);

    baseSuccessUrl.searchParams.set('plan', planType);

    return baseSuccessUrl.toString();
  })();

  const pppEligibleForFTLBundle =
    planPaymentConfig.conversionFactor <
    PROMO_FAANG_TECH_LEADS_MAX_PPP_ELIGIBLE;

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
          promoCode: stripePromoCodeId,
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
                  ...(stripePromoCodeId && {
                    stripePromoCode: stripePromoCodeId,
                  }),
                }
              : undefined,
          removePaymentMethods:
            PurchasePaymentTazapayProvider.getRemovePaymentMethods(countryCode),
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
