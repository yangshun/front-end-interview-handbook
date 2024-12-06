import type {
  PurchasePricingPlanPaymentConfigBase,
  PurchasePricingPlanPaymentConfigLocalized,
} from '../../purchase/PurchaseTypes';

export type InterviewsPricingPlanType =
  | 'annual'
  | 'lifetime'
  | 'monthly'
  | 'quarterly';

export type InterviewsPricingPlanPaymentConfig =
  PurchasePricingPlanPaymentConfigBase &
    Readonly<{
      planType: InterviewsPricingPlanType;
    }>;

export type InterviewsPricingPlanPaymentConfigLocalized =
  PurchasePricingPlanPaymentConfigLocalized &
    Readonly<{
      planType: InterviewsPricingPlanType;
    }>;

export type InterviewsPricingPlanPaymentConfigLocalizedRecord = Record<
  InterviewsPricingPlanType,
  InterviewsPricingPlanPaymentConfigLocalized
>;

const urls = {
  cancel: '/interviews/pricing',
  success: '/interviews/payment/success',
};

const productId = process.env.STRIPE_PRODUCT_ID_INTERVIEWS!;

export const InterviewsPricingPlansPaymentConfig: Record<
  InterviewsPricingPlanType,
  InterviewsPricingPlanPaymentConfig
> = {
  annual: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 125,
      before: 188, // Not used
    },
    checkoutMode: 'subscription',
    discount: 70,
    giveFTL: true,
    planType: 'annual',
    priceType: 'recurring',
    productId,
    recurring: { count: 1, interval: 'year' },
    urls,
  },
  lifetime: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 160,
      before: 300,
    },
    checkoutMode: 'payment',
    discount: 50,
    giveFTL: true,
    planType: 'lifetime',
    priceType: 'one_time',
    productId,
    recurring: null,
    urls,
  },
  monthly: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 35,
      before: 35, // Not used
    },
    checkoutMode: 'subscription',
    discount: 0,
    giveFTL: false,
    planType: 'monthly',
    priceType: 'recurring',
    productId,
    recurring: { count: 1, interval: 'month' },
    urls,
  },
  quarterly: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 75,
      before: 90, // Not used
    },
    checkoutMode: 'subscription',
    discount: 50,
    giveFTL: false,
    planType: 'quarterly',
    priceType: 'recurring',
    productId,
    recurring: { count: 3, interval: 'month' },
    urls,
  },
};
