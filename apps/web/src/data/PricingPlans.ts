import type Stripe from 'stripe';

export type PricingPlanType = 'annual' | 'lifetime' | 'monthly' | 'quarterly';
export type PricingPlanDetails = Readonly<{
  // Only null when one-time payment.
  basePriceInUSD: PriceValues;
  checkoutMode: Stripe.Checkout.Session.Mode;
  discount: number;
  planType: PricingPlanType;
  priceType: Stripe.Price.Type;
  recurring: Readonly<{
    count: number;
    interval: Stripe.Price.Recurring.Interval;
  }> | null;
}>;

type PriceValues = Readonly<{
  after: number;
  before: number;
}>;

type UnitCostValues = Readonly<{
  base: PriceValues;
  withPPP: PriceValues;
}>;

export type PricingPlanDetailsLocalized = PricingPlanDetails &
  Readonly<{
    countryCode: string;
    currency: string;
    symbol: string;
    unitCostCurrency: UnitCostValues;
    unitCostUSD: UnitCostValues;
  }>;

export type PricingPlansLocalized = Record<
  PricingPlanType,
  PricingPlanDetailsLocalized
>;

export const PricingPlansData: Record<PricingPlanType, PricingPlanDetails> = {
  annual: {
    basePriceInUSD: {
      after: 119,
      before: 129,
    },
    checkoutMode: 'subscription',
    discount: 70,
    planType: 'annual',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'year' },
  },
  lifetime: {
    basePriceInUSD: {
      after: 199,
      before: 250,
    },
    checkoutMode: 'payment',
    discount: 20,
    planType: 'lifetime',
    priceType: 'one_time',
    recurring: null,
  },
  monthly: {
    basePriceInUSD: {
      after: 29,
      before: 49,
    },
    checkoutMode: 'subscription',
    discount: 0,
    planType: 'monthly',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'month' },
  },
  quarterly: {
    basePriceInUSD: {
      after: 57,
      before: 49,
    },
    checkoutMode: 'subscription',
    discount: 50,
    planType: 'quarterly',
    priceType: 'recurring',
    recurring: { count: 3, interval: 'month' },
  },
};
