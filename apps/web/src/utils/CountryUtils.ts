import type { NextRequest } from 'next/server';

import purchasingPowerParity from '~/data/purchase/purchasingPowerParity.json';

type CountryCode = keyof typeof purchasingPowerParity;

/**
 * When someone tries to access the site using multiple countries
 * (presumably to get a cheaper price), we choose the country with
 * the larger factor as an effort to thwart their attempts
 *
 * @param req
 * @returns The country with the larger factor
 */
export function resolveCountryCode(req: NextRequest) {
  const country = req.geo?.country ?? null;
  const existingCountry = req.cookies.get('country')?.value;

  // There are some countries not in the PPP, such as `XK` (Kosovo),
  // hence we need to first check if the country is in the PPP
  const countryFactor =
    country != null && country in purchasingPowerParity
      ? purchasingPowerParity[country as CountryCode].conversionFactor
      : null;
  const existingCountryFactor =
    existingCountry != null && existingCountry in purchasingPowerParity
      ? purchasingPowerParity[existingCountry as CountryCode]?.conversionFactor
      : null;

  if (countryFactor == null || existingCountryFactor == null) {
    return country;
  }

  // Use the country with the higher factor
  return existingCountryFactor > countryFactor ? existingCountry : country;
}
