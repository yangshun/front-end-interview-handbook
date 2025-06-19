import type { ProjectsSubscriptionPlan } from '@prisma/client';

import type {
  PurchasePrice,
  PurchasePricingPlanPaymentConfigBase,
} from '~/components/purchase/PurchaseTypes';

export type ProjectsSubscriptionPlanIncludingFree =
  | ProjectsSubscriptionPlan
  | 'FREE';

export type ProjectsPricingPlanPaymentConfigLocalized = PurchasePrice &
  PurchasePricingPlanPaymentConfigBase;

export type ProjectsPricingPlanPaymentConfigLocalizedRecord = Record<
  ProjectsSubscriptionPlan,
  ProjectsPricingPlanPaymentConfigLocalized
>;

const urls = {
  cancel: '/projects/pricing',
  success: '/projects/payment/success',
};

const productId = process.env.STRIPE_PRODUCT_ID_PROJECTS!;

export const ProjectsPricingPlansPaymentConfig: Record<
  ProjectsSubscriptionPlan,
  PurchasePricingPlanPaymentConfigBase
> = {
  ANNUAL: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 108,
      before: 108, // Not used
    },
    checkoutMode: 'subscription',
    discount: 40,
    giveFTL: false,
    priceType: 'recurring',
    productId,
    recurring: { count: 1, interval: 'year' },
    urls,
  },
  MONTH: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 15,
      before: 15, // Not used
    },
    checkoutMode: 'subscription',
    discount: 0,
    giveFTL: false,
    priceType: 'recurring',
    productId,
    recurring: { count: 1, interval: 'month' },
    urls,
  },
};
