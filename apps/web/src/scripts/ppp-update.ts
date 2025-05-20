import chalk from 'chalk';
import fs from 'fs';
import url from 'node:url';
import path from 'path';

import pricing from '../data/purchase/purchasingPowerParity.json' with { type: 'json' };

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
      const urlPath = new URL(
        url.format({ pathname: '/', query: { target: countryCode } }),
        'https://ppp-api.fly.dev',
      );

      const response = await fetch(urlPath);
      const purchasingPowerParity =
        (await response.json()) as PurchasingPowerParity;

      const oldPrice: PPP = pricing[countryCode];
      const mainCurrencyName = purchasingPowerParity.currencyMain.name;
      const currencyCode = (() => {
        return Object.keys(purchasingPowerParity.currenciesCountry)[0];
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
            purchasingPowerParity.currenciesCountry[currencyCode].symbol ??
            oldPrice.currency.symbol,
        },
      };

      newPricing[countryCode] = newPrice;
    } catch (error) {
      errorCountries.push(countryCode);
      console.error(
        chalk.red(`error`),
        `Fetching PPP data for ${countryCode} failed: ${error}`,
      );
      // Fallback to old price.
      newPricing[countryCode] = pricing[countryCode];
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'src/data/purchase/purchasingPowerParity.json'),
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
