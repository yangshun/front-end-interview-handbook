'use client';

import Script from 'next/script';
import { useCallback, useEffect } from 'react';
import url from 'url';

import logEvent from '~/logging/logEvent';
import { i18nHref, useI18n, useI18nRouter } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';
import { getErrorMessage } from '~/utils/getErrorMessage';

import { useSessionContext } from '@supabase/auth-helpers-react';

/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          cancel: () => void;
          initialize: (config: {
            auto_select?: boolean;
            callback: (response: { credential: string }) => void;
            cancel_on_tap_outside?: boolean;
            client_id: string;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

type Props = Readonly<{
  next?: string | null;
}>;

export default function AuthGoogleOneTap({ next }: Props) {
  const supabaseClient = useSupabaseClientGFE();
  const { isLoading: isUserLoading, session } = useSessionContext();
  const router = useI18nRouter();
  const { locale } = useI18n();

  const handleSignInWithGoogle = useCallback(
    async (response: { credential: string }) => {
      try {
        const { error } = await supabaseClient.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        });

        if (error) {
          throw error;
        } else {
          const redirectTo = url.format(
            i18nHref(
              {
                pathname: '/auth/login-redirect',
                query: {
                  next,
                },
              },
              locale,
            ),
          );

          router.push(redirectTo);
        }
      } catch (error) {
        logEvent('auth.sign_in.fail', {
          message: getErrorMessage(error),
          namespace: 'auth',
          type: 'google',
        });
      }
    },
    [supabaseClient.auth, router, next, locale],
  );

  const initializeGoogleOneTap = useCallback(() => {
    if (!window.google?.accounts?.id) {
      return;
    }

    window.google.accounts.id.initialize({
      auto_select: false,
      callback: handleSignInWithGoogle,
      cancel_on_tap_outside: false,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    });

    if (session || isUserLoading) {
      return;
    }

    window.google?.accounts.id.prompt();
  }, [handleSignInWithGoogle, session, isUserLoading]);

  useEffect(() => {
    if (session || isUserLoading) {
      return;
    }

    if (window.google?.accounts.id) {
      window.google.accounts.id.prompt();
    } else {
      initializeGoogleOneTap();
    }

    return () => {
      window.google?.accounts?.id?.cancel();
    };
  }, [initializeGoogleOneTap, session, isUserLoading]);

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initializeGoogleOneTap}
    />
  );
}
