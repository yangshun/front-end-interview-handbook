'use client';

import { useEffect } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../hiring/gdprCountries';

import * as FullStory from '@fullstory/browser';

type Props = Readonly<{
  countryCode: string;
}>;

export default function FullStoryInit({ countryCode }: Props) {
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

    FullStory.init({ orgId: 'o-1JDPTA-na1' });
  }, [countryCode, isUserProfileLoading, userProfile?.isPremium]);

  return null;
}
