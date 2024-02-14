import clsx from 'clsx';
import { useState } from 'react';
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

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
  providers?: Array<SupabaseProviderGFE>;
  redirectTo: string;
  supabaseClient: SupabaseClientGFE;
};

export default function SupabaseAuthSocial({
  supabaseClient,
  providers,
  layout,
  redirectTo,
}: SocialAuthProps) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleProviderSignIn(provider: SupabaseProviderGFE) {
    setLoading(true);

    const { error } = await supabaseClient.auth.signInWithOAuth({
      options: { redirectTo: window.location.origin + redirectTo },
      provider,
    });

    if (error) {
      setErrorMessage(error.message);
      logEvent('auth.sign_in.fail', {
        message: error.message,
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
          'flex',
          layout === 'horizontal' ? 'gap-x-2' : 'flex-col gap-y-2',
        )}>
        {providers.map((provider) => {
          const { icon, label } = providerDetails(provider);

          return (
            <div
              key={provider}
              className={clsx(layout === 'horizontal' && 'grow')}>
              <Button
                addonPosition="start"
                className="dark:!bg-neutral-800/40 dark:hover:!bg-neutral-700/40 dark:active:!bg-neutral-600/40 rounded-lg"
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
                  });
                  handleProviderSignIn(provider);
                }}
              />
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <Text color="error" display="block" size="body2">
          {errorMessage}
        </Text>
      )}
    </div>
  );
}
