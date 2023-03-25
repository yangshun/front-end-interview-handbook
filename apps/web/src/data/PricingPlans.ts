import type Stripe from 'stripe';

export type PricingPlanType = 'annual' | 'lifetime' | 'monthly' | 'quarterly';
export type PricingPlanDetails = Readonly<{
  checkoutMode: Stripe.Checkout.Session.Mode;
  discount: number;
  planType: PricingPlanType;
  priceType: Stripe.Price.Type;
  recurring: Readonly<{
    count: number;
    interval: Stripe.Price.Recurring.Interval;
  }> | null; // Only null when one-time payment.
  unitCostBeforeDiscountInUSD: number;
  unitCostInUSD: number;
}>;

export type PricingPlanDetailsLocalized = PricingPlanDetails & {
  countryCode: string;
  currency: string;
  symbol: string;
  unitCostBeforeDiscountInCurrency: number;
  unitCostLocalizedInCurrency: number;
  unitCostLocalizedInUSD: number;
};

export type PricingPlansLocalized = Record<
  PricingPlanType,
  PricingPlanDetailsLocalized
>;

export const PricingPlansData: Record<PricingPlanType, PricingPlanDetails> = {
  annual: {
    checkoutMode: 'subscription',
    discount: 70,
    planType: 'annual',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'year' },
    unitCostBeforeDiscountInUSD: 129,
    unitCostInUSD: 120,
  },
  lifetime: {
    checkoutMode: 'payment',
    discount: 25,
    planType: 'lifetime',
    priceType: 'one_time',
    recurring: null,
    unitCostBeforeDiscountInUSD: 180,
    unitCostInUSD: 140,
  },
  monthly: {
    checkoutMode: 'subscription',
    discount: 0,
    planType: 'monthly',
    priceType: 'recurring',
    recurring: { count: 1, interval: 'month' },
    unitCostBeforeDiscountInUSD: 49,
    unitCostInUSD: 29,
  },
  quarterly: {
    checkoutMode: 'subscription',
    discount: 50,
    planType: 'quarterly',
    priceType: 'recurring',
    recurring: { count: 3, interval: 'month' },
    unitCostBeforeDiscountInUSD: 49,
    unitCostInUSD: 57,
  },
};
