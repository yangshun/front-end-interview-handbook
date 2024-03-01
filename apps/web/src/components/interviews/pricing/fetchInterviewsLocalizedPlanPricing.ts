import { clamp } from 'lodash-es';

import { shouldUseCountryCurrency } from '~/lib/stripeUtils';

import type {
  InterviewsPricingPlanDetails,
  InterviewsPricingPlanDetailsLocalized,
  InterviewsPricingPlansLocalized,
} from '~/data/interviews/InterviewsPricingPlans';
import { InterviewsPricingPlansConfig } from '~/data/interviews/InterviewsPricingPlans';

import logMessage from '~/logging/logMessage';

import {
  MAXIMUM_PPP_CONVERSION_FACTOR,
  MINIMUM_PPP_CONVERSION_FACTOR,
} from './pricingConfig';
import { priceRoundToNearestNiceNumber } from './pricingUtils';
import pppValues from './purchasingPowerParity.json';

type PurchasingPowerParity = Readonly<{
  conversionFactor: number;
  country: {
    code: string;
    name: string;
  };
  currency: {
    code: string;
    exchangeRate: number;
    symbol: string;
  };
}>;

const defaultPpp: PurchasingPowerParity = {
  conversionFactor: 1,
  country: {
    code: 'US',
    name: 'United States',
  },
  currency: {
    code: 'usd',
    exchangeRate: 1,
    symbol: '$',
  },
};

// For these countries we convert the prices using a PPP.
// These are our top 20 countries based on GA data.
// For the rest, we will just do a currency conversion based on US value.
// const PPP_COUNTRIES = new Set<string>([
//   'BD', // Bangladesh
//   'BR', // Brazil
//   'CN', // China
//   'DE', // Germany
//   'ES', // Spain
//   'EG', // Egypt
//   'FR', // France
//   'ID', // Indonesia
//   'IN', // India
//   'JP', // Japan
//   'KR', // South Korea
//   'MX', // Mexico
//   'NG', // Nigeria
//   'NL', // Netherlands
//   'PL', // Poland
//   'RU', // Russia
//   'SE', // Sweden
//   'VN', // Vietnam
//   'TR', // Turkey
//   'TW', // Taiwan
// ]);

function localizeUnitCostInUSD(valueInUSD: number, conversionFactor: number) {
  return Math.ceil(valueInUSD * conversionFactor);
}

function localizePlanDetails(
  countryCode: string,
  plan: InterviewsPricingPlanDetails,
  ppp: PurchasingPowerParity,
): InterviewsPricingPlanDetailsLocalized {
  const { currency, conversionFactor: pppConversionFactor } = ppp;

  const shouldUseCountryCurrencyValue = shouldUseCountryCurrency(currency.code);
  const { before: unitCostBeforeDiscountInUSD, after: unitCostInUSD } =
    plan.basePriceInUSD;

  const conversionFactor = clamp(
    pppConversionFactor,
    MINIMUM_PPP_CONVERSION_FACTOR,
    MAXIMUM_PPP_CONVERSION_FACTOR,
  );

  const unitCostLocalizedInUSD = localizeUnitCostInUSD(
    unitCostInUSD,
    conversionFactor,
  );

  const unitCostLocalizedBeforeDiscountInUSD = priceRoundToNearestNiceNumber(
    localizeUnitCostInUSD(unitCostBeforeDiscountInUSD, conversionFactor),
  );

  const unitCostLocalizedInCurrency = shouldUseCountryCurrencyValue
    ? priceRoundToNearestNiceNumber(
        unitCostLocalizedInUSD * currency.exchangeRate,
      )
    : unitCostLocalizedInUSD;

  const unitCostLocalizedBeforeDiscountInCurrency =
    shouldUseCountryCurrencyValue
      ? priceRoundToNearestNiceNumber(
          unitCostLocalizedBeforeDiscountInUSD * currency.exchangeRate,
        )
      : unitCostLocalizedBeforeDiscountInUSD;

  const unitCostInCurrency = shouldUseCountryCurrencyValue
    ? priceRoundToNearestNiceNumber(unitCostInUSD * currency.exchangeRate)
    : unitCostInUSD;

  const unitCostBeforeDiscountInCurrency = shouldUseCountryCurrencyValue
    ? priceRoundToNearestNiceNumber(
        unitCostBeforeDiscountInUSD * currency.exchangeRate,
      )
    : unitCostBeforeDiscountInUSD;

  return {
    ...plan,
    conversionFactor,
    countryCode,
    currency: shouldUseCountryCurrencyValue ? currency.code : 'usd',
    symbol: shouldUseCountryCurrencyValue ? currency.symbol : '$',
    unitCostCurrency: {
      base: {
        after: unitCostInCurrency,
        before: unitCostBeforeDiscountInCurrency,
      },
      withPPP: {
        after: unitCostLocalizedInCurrency,
        before: unitCostLocalizedBeforeDiscountInCurrency,
      },
    },
    unitCostUSD: {
      base: {
        after: unitCostInUSD,
        before: unitCostBeforeDiscountInUSD,
      },
      withPPP: {
        after: unitCostLocalizedInUSD,
        before: unitCostLocalizedBeforeDiscountInUSD,
      },
    },
  };
}
type CountryCode = keyof typeof pppValues;

export default async function fetchInterviewsLocalizedPlanPricing(
  countryCode: string,
): Promise<InterviewsPricingPlansLocalized> {
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
    annual: localizePlanDetails(
      countryCode,
      InterviewsPricingPlansConfig.annual,
      purchasingPowerParity,
    ),
    lifetime: localizePlanDetails(
      countryCode,
      InterviewsPricingPlansConfig.lifetime,
      purchasingPowerParity,
    ),
    monthly: localizePlanDetails(
      countryCode,
      InterviewsPricingPlansConfig.monthly,
      purchasingPowerParity,
    ),
    quarterly: localizePlanDetails(
      countryCode,
      InterviewsPricingPlansConfig.quarterly,
      purchasingPowerParity,
    ),
  };
}
