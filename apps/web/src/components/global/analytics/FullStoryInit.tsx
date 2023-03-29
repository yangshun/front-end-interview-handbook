'use client';

import { useEffect } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../../hiring/gdprCountries';

import * as FullStory from '@fullstory/browser';
import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
}>;

export default function FullStoryInit({ countryCode }: Props) {
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const user = useUser();

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

    if (user != null && userProfile != null && !userProfile.isPremium) {
      FullStory.identify(user.id, {
        countryCode,
        email: user.email ?? '',
        plan: userProfile.plan ?? '',
        premium: userProfile?.isPremium,
        stripeCustomerId: userProfile.stripeCustomerID ?? '',
      });
    }
  }, [countryCode, isUserProfileLoading, user, userProfile]);

  return null;
}
