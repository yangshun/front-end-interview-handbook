/**
 * Zero-decimal currencies as per Stripe docs.
 *
 * https://stripe.com/docs/currencies#zero-decimal
 */
const zeroDecimalCurrencies = new Set([
  'bif',
  'clp',
  'djf',
  'gnf',
  'jpy',
  'kmf',
  'krw',
  'mga',
  'pyg',
  'rwf',
  // 'ugx', Special case where it's zero decimal but for legacy purposes still need to be multiplied by 100.
  'vnd',
  'vuv',
  'xaf',
  'xof',
  'xpf',
]);

export function isZeroDecimalCurrency(currency: string) {
  return zeroDecimalCurrencies.has(currency);
}

/**
 * Converts a numerical dollar currency value into the amount that Stripe accepts.
 * Basically multiply by 100 if not a zero decimal currency.
 *
 * @param currency
 * @param value
 */
export function convertCurrencyValueToStripeValue(
  value: number,
  currency: string,
) {
  return isZeroDecimalCurrency(currency) ? value : value * 100;
}

/**
 * Converts a Stripe amount into a numerical dollar currency value.
 * Basically divide by 100 if not a zero decimal currency.
 *
 * @param currency
 * @param value
 */
export function convertStripeValueToCurrencyValue(
  value: number,
  currency: string,
) {
  return isZeroDecimalCurrency(currency) ? value : value / 100;
}

// List of currencies where conversion from USD will be a huge value.
const hugeAmountCurrencies = new Set([
  'bif',
  'cdf',
  'cop',
  'gnf',
  'iqd',
  'khr',
  'krw',
  'lak',
  'lbp',
  'mga',
  'mmk',
  'mnt',
  'mwk',
  'pyg',
  'rwf',
  'sll',
  'std',
  'tzs',
  'ugx',
  'uzs',
  'vnd',
]);

// Determines if this currency is huge. We care about this because
// Stripe's `amount` value has a limit of 99999999 and our lifetime plan
// converted to these currencies will exceed Stripe's limit.
export function isHugeAmountCurrency(currency: string) {
  return hugeAmountCurrencies.has(currency);
}

export function withinStripeAmountLimit(currency: string) {
  return (
    !isHugeAmountCurrency(currency) ||
    // Huge amount is ok if zero decimal because we don't need to
    // multiply by 100.
    (isHugeAmountCurrency(currency) && isZeroDecimalCurrency(currency))
  );
}

// We only show in the country's local currency when these conditions are fulfilled:
// 1. Currency is supported by Stripe.
// 2. Converted amount in local currency wouldn't exceed Stripe's allowable amount limit.
export function shouldUseCountryCurrency(currency: string) {
  return isSupportedCurrency(currency) && withinStripeAmountLimit(currency);
}

/**
 * Supported currencies as per Stripe docs.
 *
 * https://stripe.com/docs/currencies#presentment-currencies
 */
export function isSupportedCurrency(currency: string) {
  return supportedCurrencies.has(currency);
}

const supportedCurrencies = new Set([
  'usd',
  'aed',
  'afn',
  'all',
  'amd',
  'ang',
  'aoa',
  'ars',
  'aud',
  'awg',
  'azn',
  'bam',
  'bbd',
  'bdt',
  'bgn',
  'bif',
  'bmd',
  'bnd',
  'bob',
  'brl',
  'bsd',
  'bwp',
  'byn',
  'bzd',
  'cad',
  'cdf',
  'chf',
  'clp',
  'cny',
  'cop',
  'crc',
  'cve',
  'czk',
  'djf',
  'dkk',
  'dop',
  'dzd',
  'egp',
  'etb',
  'eur',
  'fjd',
  'fkp',
  'gbp',
  'gel',
  'gip',
  'gmd',
  'gnf',
  'gtq',
  'gyd',
  'hkd',
  'hnl',
  'hrk',
  'htg',
  'huf',
  'idr',
  'ils',
  'inr',
  'isk',
  'jmd',
  'jpy',
  'kes',
  'kgs',
  'khr',
  'kmf',
  'krw',
  'kyd',
  'kzt',
  'lak',
  'lbp',
  'lkr',
  'lrd',
  'lsl',
  'mad',
  'mdl',
  'mga',
  'mkd',
  'mmk',
  'mnt',
  'mop',
  'mro',
  'mur',
  'mvr',
  'mwk',
  'mxn',
  'myr',
  'mzn',
  'nad',
  'ngn',
  'nio',
  'nok',
  'npr',
  'nzd',
  'pab',
  'pen',
  'pgk',
  'php',
  'pkr',
  'pln',
  'pyg',
  'qar',
  'ron',
  'rsd',
  'rub',
  'rwf',
  'sar',
  'sbd',
  'scr',
  'sek',
  'sgd',
  'shp',
  'sle',
  'sll',
  'sos',
  'srd',
  'std',
  'szl',
  'thb',
  'tjs',
  'top',
  'try',
  'ttd',
  'twd',
  'tzs',
  'uah',
  'ugx',
  'uyu',
  'uzs',
  'vnd',
  'vuv',
  'wst',
  'xaf',
  'xcd',
  'xof',
  'xpf',
  'yer',
  'zar',
  'zmw',
]);

const prohibitedCountries = new Set([
  'CU', // Cuba
  'IR', // Iran
  'KP', // North Korea
  'SY', // Syria
]);

export function isProhibitedCountry(countryCode: string) {
  return prohibitedCountries.has(countryCode);
}
