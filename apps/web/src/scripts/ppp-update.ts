import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import pricing from '../data/purchase/purchasingPowerParity.json' assert { type: 'json' };

export type PurchasingPowerParity = Readonly<{
  countryCodeIsoAlpha2: string;
  countryCodeIsoAlpha3: string;
  currenciesCountry: Record<string, Readonly<{ name: string; symbol: string }>>;
  currencyMain: Readonly<{
    exchangeRate: number;
    name: string;
    symbol: string;
  }>;
  ppp: number;
  pppConversionFactor: number;
}>;

type PurchasingPowerParityPayload = Readonly<{
  ppp: PurchasingPowerParity;
}>;

type CountryCode = keyof typeof pricing;

type PPP = Readonly<{
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

const countries = Object.keys(pricing) as ReadonlyArray<CountryCode>;
const newPricing: Partial<Record<CountryCode, PPP>> = {};

async function updateCountryPPP() {
  const errorCountries = [];

  for (const countryCode of countries) {
    console.info(chalk.cyan(`info`), `Fetching PPP data for ${countryCode}`);
    try {
      const response = await fetch(
        `https://api.purchasing-power-parity.com/?target=${countryCode}`,
      );
      const payload = (await response.json()) as PurchasingPowerParityPayload;
      const { ppp: purchasingPowerParity } = payload;

      const oldPrice: PPP = pricing[countryCode];
      const mainCurrencyName = purchasingPowerParity.currencyMain.name;
      const currencyCode = (() => {
        for (const [currency, { name }] of Object.entries(
          purchasingPowerParity.currenciesCountry,
        )) {
          if (name === mainCurrencyName) {
            return currency;
          }
        }
      })();

      if (currencyCode == null) {
        throw `No currency code found for main currency ${mainCurrencyName}!`;
      }

      // TODO: Temp hack to make HR be 0.5, as the PPP is not updated
      // yet after the currency change.
      const conversionFactor =
        countryCode === 'HR' ? 0.5 : purchasingPowerParity.pppConversionFactor;
      const delta = Math.abs(conversionFactor - oldPrice.conversionFactor);

      if (delta > 0.1) {
        console.warn(
          chalk.yellow(`warning`),
          `PPP for ${countryCode} differs by ${delta} (old: ${oldPrice.conversionFactor}, new: ${conversionFactor})`,
        );
      }

      const newPrice = {
        conversionFactor,
        country: oldPrice.country,
        currency: {
          code: currencyCode.toLocaleLowerCase(),
          exchangeRate: purchasingPowerParity.currencyMain.exchangeRate,
          symbol:
            purchasingPowerParity.currencyMain.symbol ??
            oldPrice.currency.symbol,
        },
      };

      newPricing[countryCode] = newPrice;
    } catch (err) {
      errorCountries.push(countryCode);
      console.error(
        chalk.red(`error`),
        `Fetching PPP data for ${countryCode} failed: ${err}`,
      );
      // Fallback to old price.
      newPricing[countryCode] = pricing[countryCode];
    }
  }

  fs.writeFileSync(
    path.join(
      process.cwd(),
      'src/components/pricing/purchasingPowerParity.json',
    ),
    JSON.stringify(newPricing, null, 2),
  );

  console.info(
    chalk.gray(`info`),
    `Fetch finished with ${errorCountries.length} error(s)${
      errorCountries.length > 0 ? ': ' + errorCountries.join(', ') : ''
    }`,
  );
}

updateCountryPPP();
