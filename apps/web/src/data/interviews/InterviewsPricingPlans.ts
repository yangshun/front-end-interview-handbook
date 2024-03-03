import type {
  PurchasePricingPlanPaymentConfigBase,
  PurchasePricingPlanPaymentConfigLocalized,
} from '../purchase/PurchaseTypes';

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

export const InterviewsPricingPlansPaymentConfig: Record<
  InterviewsPricingPlanType,
  InterviewsPricingPlanPaymentConfig
> = {
  annual: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 120,
      before: 188, // Not used
    },
    checkoutMode: 'subscription',
    discount: 70,
    planType: 'annual',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'year' },
  },
  lifetime: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 154,
      before: 300,
    },
    checkoutMode: 'payment',
    discount: 50,
    planType: 'lifetime',
    priceType: 'one_time',
    recurring: null,
  },
  monthly: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 35,
      before: 35, // Not used
    },
    checkoutMode: 'subscription',
    discount: 0,
    planType: 'monthly',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'month' },
  },
  quarterly: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 70,
      before: 90, // Not used
    },
    checkoutMode: 'subscription',
    discount: 50,
    planType: 'quarterly',
    priceType: 'recurring',
    recurring: { count: 3, interval: 'month' },
  },
};
