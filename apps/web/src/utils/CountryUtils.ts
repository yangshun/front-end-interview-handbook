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

  if (existingCountry == null || country == null) {
    return country;
  }

  const countryFactor =
    purchasingPowerParity[country as CountryCode].conversionFactor;
  const existingCountryFactor =
    purchasingPowerParity[existingCountry as CountryCode].conversionFactor;

  // Use the country with the higher factor
  return existingCountryFactor > countryFactor ? existingCountry : country;
}
