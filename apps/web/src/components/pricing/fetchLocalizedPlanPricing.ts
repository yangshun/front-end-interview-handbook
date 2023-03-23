import { shouldUseCountryCurrency } from '~/lib/stripeUtils';

import logMessage from '~/logging/logMessage';

import { priceRoundToNearestNiceNumber } from './pricingUtils';
import pppValues from './purchasingPowerParity.json';
import type {
  PricingPlanDetails,
  PricingPlanDetailsLocalized,
  PricingPlansLocalized,
} from '../../data/PricingPlans';
import { PricingPlansData } from '../../data/PricingPlans';

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

const MINIMUM_PPP_CONVERSION_FACTOR = 0.4;
const MAXIMUM_PPP_CONVERSION_FACTOR = 2;
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
  plan: PricingPlanDetails,
  ppp: PurchasingPowerParity,
): PricingPlanDetailsLocalized {
  const { currency, conversionFactor: pppConversionFactor } = ppp;

  const shouldUseCountryCurrencyValue = shouldUseCountryCurrency(currency.code);

  const conversionFactor = Math.min(
    Math.max(pppConversionFactor, MINIMUM_PPP_CONVERSION_FACTOR),
    MAXIMUM_PPP_CONVERSION_FACTOR,
  );

  const unitCostLocalizedInUSD = localizeUnitCostInUSD(
    plan.unitCostInUSD,
    conversionFactor,
  );

  const unitCostLocalizedBeforeDiscountInUSD = priceRoundToNearestNiceNumber(
    localizeUnitCostInUSD(plan.unitCostBeforeDiscountInUSD, conversionFactor),
  );

  const unitCostLocalizedInCurrency = shouldUseCountryCurrencyValue
    ? priceRoundToNearestNiceNumber(
        unitCostLocalizedInUSD * currency.exchangeRate,
      )
    : unitCostLocalizedInUSD;

  const unitCostBeforeDiscountInCurrency = shouldUseCountryCurrencyValue
    ? priceRoundToNearestNiceNumber(
        unitCostLocalizedBeforeDiscountInUSD * currency.exchangeRate,
      )
    : unitCostLocalizedBeforeDiscountInUSD;

  return {
    ...plan,
    countryCode,
    currency: shouldUseCountryCurrencyValue ? currency.code : 'usd',
    symbol: shouldUseCountryCurrencyValue ? currency.symbol : '$',
    unitCostBeforeDiscountInCurrency,
    unitCostLocalizedInCurrency,
    unitCostLocalizedInUSD,
  };
}
type CountryCode = keyof typeof pppValues;

export default async function fetchLocalizedPlanPricing(
  countryCode: string,
): Promise<PricingPlansLocalized> {
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
    });
    // Fallback to US ppp.
    purchasingPowerParity = defaultPpp;
  }

  // Repeating for typesafety.
  return {
    annual: localizePlanDetails(
      countryCode,
      PricingPlansData.annual,
      purchasingPowerParity,
    ),
    lifetime: localizePlanDetails(
      countryCode,
      PricingPlansData.lifetime,
      purchasingPowerParity,
    ),
    monthly: localizePlanDetails(
      countryCode,
      PricingPlansData.monthly,
      purchasingPowerParity,
    ),
    quarterly: localizePlanDetails(
      countryCode,
      PricingPlansData.quarterly,
      purchasingPowerParity,
    ),
  };
}
