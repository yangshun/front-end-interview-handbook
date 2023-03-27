'use client';

import { useEffect } from 'react';

import gdprCountryCodes from '../hiring/gdprCountries';

import * as FullStory from '@fullstory/browser';

type Props = Readonly<{
  countryCode: string;
}>;

export default function FullStoryInit({ countryCode }: Props) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' ||
      gdprCountryCodes.has(countryCode)
    ) {
      return;
    }

    FullStory.init({ orgId: '<your org id here>' });
  }, [countryCode]);

  return null;
}
