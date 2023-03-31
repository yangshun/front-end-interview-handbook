'use client';

import jsCookie from 'js-cookie';
import { useEffect } from 'react';
import Smartlook from 'smartlook-client';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../../hiring/gdprCountries';

import { useUser } from '@supabase/auth-helpers-react';

export default function SmartlookInit() {
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

    // Don't record if premium.
    if (isUserProfileLoading || userProfile?.isPremium) {
      return;
    }

    Smartlook.init('d85c735d2ace56279232d15db29502c8bc533ca2', {
      region: 'eu',
    });

    if (user != null && userProfile != null && !userProfile.isPremium) {
      Smartlook.identify(user.id, {
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
