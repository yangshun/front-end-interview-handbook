import pppValues from '~/data/purchase/purchasingPowerParity.json';

import type { InterviewsPricingPlanPaymentConfigLocalizedRecord } from '~/components/interviews/purchase/InterviewsPricingPlans';
import { InterviewsPricingPlansPaymentConfig } from '~/components/interviews/purchase/InterviewsPricingPlans';
import type { PurchasingPowerParity } from '~/components/purchase/PurchasePPPUtils';
import {
  defaultPpp,
  localizePlanPaymentConfig,
} from '~/components/purchase/PurchasePPPUtils';

import logMessage from '~/logging/logMessage';

type CountryCode = keyof typeof pppValues;

export default async function fetchInterviewsPricingPlanPaymentConfigLocalizedRecord(
  countryCode: string,
): Promise<InterviewsPricingPlanPaymentConfigLocalizedRecord> {
  // Default PPP.
  let purchasingPowerParity: PurchasingPowerParity = defaultPpp;

  try {
    if (countryCode !== 'US') {
      // TODO: Make a union for country codes.
      if (pppValues[countryCode as CountryCode] == null) {
        throw new Error('Error fetching details');
      }

      purchasingPowerParity = pppValues[countryCode as CountryCode];
    }
  } catch {
    // Ignore and proceed with default ppp.
    logMessage({
      level: 'error',
      message: `Error fetching purchasing power parity for ${countryCode}`,
      namespace: 'interviews',
      title: 'Purchasing power parity error',
    });
    // Fallback to US ppp.
    purchasingPowerParity = defaultPpp;
  }

  // Repeating for typesafety.
  return {
    annual: {
      ...localizePlanPaymentConfig(
        countryCode,
        InterviewsPricingPlansPaymentConfig.annual,
        purchasingPowerParity,
      ),
      planType: 'annual',
    },
    lifetime: {
      ...localizePlanPaymentConfig(
        countryCode,
        InterviewsPricingPlansPaymentConfig.lifetime,
        purchasingPowerParity,
      ),
      planType: 'lifetime',
    },
    monthly: {
      ...localizePlanPaymentConfig(
        countryCode,
        InterviewsPricingPlansPaymentConfig.monthly,
        purchasingPowerParity,
      ),
      planType: 'monthly',
    },
    quarterly: {
      ...localizePlanPaymentConfig(
        countryCode,
        InterviewsPricingPlansPaymentConfig.quarterly,
        purchasingPowerParity,
      ),
      planType: 'quarterly',
    },
  };
}
