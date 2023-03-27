'use client';

import { useEffect } from 'react';
import Smartlook from 'smartlook-client';

import gdprCountryCodes from '../hiring/gdprCountries';

type Props = Readonly<{
  countryCode: string;
}>;

export default function SmartlookInit({ countryCode }: Props) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' ||
      gdprCountryCodes.has(countryCode)
    ) {
      return;
    }

    Smartlook.init('d85c735d2ace56279232d15db29502c8bc533ca2', {
      region: 'eu',
    });
  }, [countryCode]);

  return null;
}
