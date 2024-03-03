import type {
  PurchasePrice,
  PurchasePricingPlanDetailsBase,
} from '~/data/purchase/PurchaseTypes';

import type { ProjectsSubscriptionPlan } from '@prisma/client';

export type ProjectsSubscriptionPlanIncludingFree =
  | ProjectsSubscriptionPlan
  | 'FREE';

type ProjectsPricingPlanDetails = PurchasePricingPlanDetailsBase &
  Readonly<{
    planType: ProjectsSubscriptionPlan;
  }>;

export type ProjectsPricingPlanDetailsLocalized = ProjectsPricingPlanDetails &
  PurchasePrice;

export type ProjectsPricingPlansLocalized = Record<
  ProjectsSubscriptionPlan,
  ProjectsPricingPlanDetailsLocalized
>;

export const ProjectsPricingPlansConfig: Record<
  ProjectsSubscriptionPlan,
  ProjectsPricingPlanDetails
> = {
  ANNUAL: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 108,
      before: 108, // Not used
    },
    checkoutMode: 'subscription',
    discount: 20,
    planType: 'ANNUAL',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'year' },
  },
  MONTH: {
    allowPromoCode: true,
    basePriceInUSD: {
      after: 15,
      before: 15, // Not used
    },
    checkoutMode: 'subscription',
    discount: 0,
    planType: 'MONTH',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'month' },
  },
};
