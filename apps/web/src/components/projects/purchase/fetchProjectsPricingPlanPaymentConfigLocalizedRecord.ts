import pppValues from '~/data/purchase/purchasingPowerParity.json';

import type { PurchasingPowerParity } from '~/components/purchase/PurchasePPPUtils';
import {
  defaultPpp,
  localizePlanPaymentConfig,
} from '~/components/purchase/PurchasePPPUtils';

import logMessage from '~/logging/logMessage';

import {
  type ProjectsPricingPlanPaymentConfigLocalizedRecord,
  ProjectsPricingPlansPaymentConfig,
} from './ProjectsPricingPlans';

type CountryCode = keyof typeof pppValues;

export default async function fetchProjectsPricingPlanPaymentConfigLocalizedRecord(
  countryCode: string,
): Promise<ProjectsPricingPlanPaymentConfigLocalizedRecord> {
  // Default PPP.
  let purchasingPowerParity: PurchasingPowerParity = defaultPpp;

  try {
    if (countryCode !== 'US') {
      // TODO: Make a union for country codes.
      if (pppValues[countryCode as CountryCode] == null) {
        throw new Error(`Error fetching PPP for country code ${countryCode}`);
      }

      purchasingPowerParity = pppValues[countryCode as CountryCode];
    }
  } catch {
    // Ignore and proceed with default ppp.
    logMessage({
      level: 'error',
      message: `Error fetching purchasing power parity for ${countryCode}`,
      namespace: 'projects',
      title: 'Purchasing power parity error',
    });
    // Fallback to US ppp.
    purchasingPowerParity = defaultPpp;
  }

  // Repeating for typesafety.
  return {
    ANNUAL: localizePlanPaymentConfig(
      countryCode,
      ProjectsPricingPlansPaymentConfig.ANNUAL,
      purchasingPowerParity,
    ),
    MONTH: localizePlanPaymentConfig(
      countryCode,
      ProjectsPricingPlansPaymentConfig.MONTH,
      purchasingPowerParity,
    ),
  };
}
