'use client';

import { useEffect } from 'react';
import Smartlook from 'smartlook-client';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../hiring/gdprCountries';

type Props = Readonly<{
  countryCode: string;
}>;

export default function SmartlookInit({ countryCode }: Props) {
  const { userProfile, isUserProfileLoading } = useUserProfile();

  useEffect(() => {
    // Don't record for development.
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    // Don't record for GDPR countries.
    if (gdprCountryCodes.has(countryCode)) {
      return;
    }

    // Don't record if premium.
    if (isUserProfileLoading || userProfile?.isPremium) {
      return;
    }

    Smartlook.init('d85c735d2ace56279232d15db29502c8bc533ca2', {
      region: 'eu',
    });
  }, [countryCode, isUserProfileLoading, userProfile?.isPremium]);

  return null;
}
