'use client';

import jsCookie from 'js-cookie';
import { useEffect } from 'react';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../../hiring/gdprCountries';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { useUser } from '@supabase/auth-helpers-react';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://460c2fa53b094ff4a66e01209cd4b5c4@o4504898382790656.ingest.sentry.io/4504898384429056',
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({
        blockAllMedia: false,
        maskAllText: false,
      }),
    ],
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    tracesSampleRate: 1.0,
  });
}

export default function SentryInit() {
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

    if (user != null && userProfile != null) {
      Sentry.setUser({
        countryCode,
        email: user.email,
        id: user.id,
        plan: userProfile.plan,
        premium: userProfile?.isPremium,
        stripeCustomerId: userProfile.stripeCustomerID,
      });
    }
  }, [isUserProfileLoading, user, userProfile]);

  return null;
}
