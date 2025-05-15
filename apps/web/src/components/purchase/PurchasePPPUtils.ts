import { clamp } from 'lodash-es';

import { shouldUseCountryCurrency } from '~/lib/stripeUtils';

import type {
  PurchasePricingPlanPaymentConfigBase,
  PurchasePricingPlanPaymentConfigLocalized,
} from '~/components/purchase/PurchaseTypes';

import {
  MAXIMUM_PPP_CONVERSION_FACTOR,
  MINIMUM_PPP_CONVERSION_FACTOR,
} from './PurchasePricingConfig';
import { priceRoundToNearestNiceNumber } from './PurchasePricingUtils';

export type PurchasingPowerParity = Readonly<{
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

export const defaultPpp: PurchasingPowerParity = {
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

export function localizePlanPaymentConfig(
  countryCode: string,
  plan: PurchasePricingPlanPaymentConfigBase,
  ppp: PurchasingPowerParity,
): PurchasePricingPlanPaymentConfigLocalized {
  const { conversionFactor: pppConversionFactor, currency } = ppp;

  const shouldUseCountryCurrencyValue = shouldUseCountryCurrency(currency.code);
  const { after: unitCostInUSD, before: unitCostBeforeDiscountInUSD } =
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
