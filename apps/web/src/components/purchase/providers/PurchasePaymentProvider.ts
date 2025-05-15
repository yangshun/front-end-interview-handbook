import { INTERVIEWS_TAZAPAY_IS_LIVE } from '~/data/FeatureFlags';

import type { PurchasePricingPlanPaymentConfigBase } from '../PurchaseTypes';

const TAZAPAY_ENABLED_COUNTRIES = new Set(['IN']);

export function resolvePaymentProvider(
  plan: PurchasePricingPlanPaymentConfigBase,
  countryCode: string,
) {
  if (!INTERVIEWS_TAZAPAY_IS_LIVE) {
    return 'stripe';
  }

  return TAZAPAY_ENABLED_COUNTRIES.has(countryCode) && plan.tazapayEnabled
    ? 'tazapay'
    : 'stripe';
}
