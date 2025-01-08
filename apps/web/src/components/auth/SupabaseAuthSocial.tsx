import clsx from 'clsx';
import { useState } from 'react';
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri';
import url from 'url';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import Alert from '../ui/Alert';

import type { Provider } from '@supabase/supabase-js';

export type SupabaseProviderGFE = 'github' | 'google';

type ProviderDetails = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  type: Provider;
}>;

const Providers: Record<SupabaseProviderGFE, ProviderDetails> = {
  github: {
    icon: RiGithubFill,
    label: 'GitHub',
    type: 'github',
  },
  google: {
    icon: RiGoogleFill,
    label: 'Google',
    type: 'google',
  },
};

export function providerDetails(
  provider: SupabaseProviderGFE,
): ProviderDetails {
  return Providers[provider];
}

export type SocialAuthProps = {
  layout?: 'horizontal' | 'vertical';
  next: string;
  providers?: Array<SupabaseProviderGFE>;
  supabaseClient: SupabaseClientGFE;
};

export default function SupabaseAuthSocial({
  supabaseClient,
  providers,
  layout,
  next,
}: SocialAuthProps) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleProviderSignIn(provider: SupabaseProviderGFE) {
    setLoading(true);

    const redirectTo =
      window.location.origin +
      url.format({
        pathname: '/auth/login-redirect',
        query: {
          next,
        },
      });

    const { error } = await supabaseClient.auth.signInWithOAuth({
      options: { redirectTo },
      provider,
    });

    if (error) {
      setErrorMessage(error.message);
      logEvent('auth.sign_in.fail', {
        message: error.message,
        name: error.name,
        namespace: 'auth',
        stack: error.stack,
        type: provider,
      });
    }

    setLoading(false);
  }

  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={clsx(
          'flex flex-col gap-y-3',
          layout === 'horizontal' && 'gap-x-4 lg:flex-row',
        )}>
        {providers.map((provider) => {
          const { icon, label } = providerDetails(provider);

          return (
            <div
              key={provider}
              className={clsx(layout === 'horizontal' && 'grow')}>
              <Button
                addonPosition="start"
                className="rounded-lg dark:!bg-neutral-800/40 dark:hover:!bg-neutral-700/40 dark:active:!bg-neutral-600/40"
                display="block"
                icon={icon}
                isDisabled={loading}
                isLoading={loading}
                label={intl.formatMessage(
                  {
                    defaultMessage: 'Continue with {authProviderLabel}',
                    description:
                      'Label of social media sign in button on Social Sign In page',
                    id: 'q0J0CA',
                  },
                  {
                    authProviderLabel: label,
                  },
                )}
                size="lg"
                variant="secondary"
                onClick={() => {
                  logEvent('auth.sign_in', {
                    element: 'Auth page OAuth sign in button',
                    label,
                    namespace: 'auth',
                  });
                  handleProviderSignIn(provider);
                }}
              />
            </div>
          );
        })}
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </div>
  );
}
