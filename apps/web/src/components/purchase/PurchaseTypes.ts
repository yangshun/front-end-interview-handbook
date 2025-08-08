import type Stripe from 'stripe';

type PriceValues = Readonly<{
  after: number;
  before: number;
}>;

type UnitCostPrice = Readonly<{
  base: PriceValues;
  withPPP: PriceValues;
}>;

export type PurchasePrice = Readonly<{
  conversionFactor: number;
  countryCode: string;
  currency: string;
  symbol: string;
  unitCostCurrency: UnitCostPrice;
  unitCostUSD: UnitCostPrice;
}>;

export type PurchasePricingPlanPaymentConfigBase = Readonly<{
  allowPromoCode: boolean;
  basePriceInUSD: PriceValues;
  checkoutMode: Stripe.Checkout.Session.Mode;
  // Vs monthly for recurring. Vs before for one-time.
  discount: number;
  giveFTL: boolean;
  priceType: Stripe.Price.Type;
  // Stripe product ID.
  productId: string;
  // Null when one-time payment.
  recurring: Readonly<{
    count: number;
    interval: Stripe.Price.Recurring.Interval;
  }> | null;
  tazapayEnabled: boolean;
  urls: {
    cancel: string;
    success: string;
  };
}>;

export type PurchasePricingPlanPaymentConfigLocalized = PurchasePrice &
  PurchasePricingPlanPaymentConfigBase;

export type PurchasePaymentProvider = 'stripe' | 'tazapay';
