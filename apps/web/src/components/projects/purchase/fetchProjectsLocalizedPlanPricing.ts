import pppValues from '~/data/purchase/purchasingPowerParity.json';

import type { PurchasingPowerParity } from '~/components/payments/PurchasePPPUtils';
import {
  defaultPpp,
  localizePlanDetails,
} from '~/components/payments/PurchasePPPUtils';

import logMessage from '~/logging/logMessage';

import {
  ProjectsPricingPlansConfig,
  type ProjectsPricingPlansLocalized,
} from './ProjectsPricingPlans';

type CountryCode = keyof typeof pppValues;

export default async function fetchProjectsLocalizedPlanPricing(
  countryCode: string,
): Promise<ProjectsPricingPlansLocalized> {
  // Default PPP.
  let purchasingPowerParity: PurchasingPowerParity = defaultPpp;

  try {
    if (countryCode !== 'US') {
      // TODO: Make a union for country codes.
      if (pppValues[countryCode as CountryCode] == null) {
        throw 'Error fetching details';
      }
      purchasingPowerParity = pppValues[countryCode as CountryCode];
    }
  } catch {
    // Ignore and proceed with default ppp.
    logMessage({
      level: 'error',
      message: `Error fetching purchasing power parity for ${countryCode}`,
      title: 'Purchasing power parity error',
    });
    // Fallback to US ppp.
    purchasingPowerParity = defaultPpp;
  }

  // Repeating for typesafety.
  return {
    ANNUAL: {
      ...localizePlanDetails(
        countryCode,
        ProjectsPricingPlansConfig.ANNUAL,
        purchasingPowerParity,
      ),
      planType: 'ANNUAL',
    },
    MONTH: {
      ...localizePlanDetails(
        countryCode,
        ProjectsPricingPlansConfig.MONTH,
        purchasingPowerParity,
      ),
      planType: 'MONTH',
    },
  };
}
