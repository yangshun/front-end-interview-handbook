import { useState } from 'react';
import url from 'url';

import logEvent from '~/logging/logEvent';
import { i18nHref, useI18n } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { SupabaseProviderGFE } from './SupabaseAuthSocial';

export function useOAuthSignIn(opts?: {
  next?: string;
  onError?: (errorMessage: string) => void;
}) {
  const supabaseClient = useSupabaseClientGFE();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { locale } = useI18n();

  async function signInWithProvider(provider: SupabaseProviderGFE) {
    setLoading(true);

    const redirectTo =
      window.location.origin +
      url.format(
        i18nHref(
          {
            pathname: '/auth/login-redirect',
            query: {
              next: opts?.next || window.location.pathname,
            },
          },
          locale,
        ),
      );

    const { error } = await supabaseClient.auth.signInWithOAuth({
      options: { redirectTo },
      provider,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      opts?.onError?.(error.message);

      logEvent('auth.sign_in.fail', {
        message: error.message,
        name: error.name,
        namespace: 'auth',
        stack: error.stack,
        type: provider,
      });
    }
  }

  return {
    errorMessage,
    loading,
    signInWithProvider,
  };
}
