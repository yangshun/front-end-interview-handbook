'use client';

import jsCookie from 'js-cookie';
import { useEffect } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../../hiring/gdprCountries';

import * as FullStory from '@fullstory/browser';
import { useUser } from '@supabase/auth-helpers-react';

export default function FullStoryInit() {
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const user = useUser();

  useEffect(() => {
    // Don't record for development.
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    const countryCode = jsCookie.get('country') || null;

    // Don't record for GDPR countries.
    if (countryCode == null || gdprCountryCodes.has(countryCode)) {
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
  }, [isUserProfileLoading, user, userProfile]);

  return null;
}
