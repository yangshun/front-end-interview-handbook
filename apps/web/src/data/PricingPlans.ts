import type Stripe from 'stripe';

export type PricingPlanType = 'annual' | 'lifetime' | 'monthly' | 'quarterly';
export type PricingPlanDetails = Readonly<{
  allowPromoCode: boolean;
  // Only null when one-time payment.
  basePriceInUSD: PriceValues;
  checkoutMode: Stripe.Checkout.Session.Mode;
  // Vs monthly for recurring. Vs before for one-time.
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
    conversionFactor: number;
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
