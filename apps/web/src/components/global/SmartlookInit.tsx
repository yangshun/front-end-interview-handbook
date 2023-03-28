'use client';

import { useEffect } from 'react';
import Smartlook from 'smartlook-client';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../hiring/gdprCountries';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  countryCode: string;
}>;

export default function SmartlookInit({ countryCode }: Props) {
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
  }, [countryCode, isUserProfileLoading, user, userProfile]);

  return null;
}
