import type { Provider } from '@supabase/supabase-js';
import clsx from 'clsx';
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import logEvent from '~/logging/logEvent';

import Alert from '../ui/Alert';
import { useOAuthSignIn } from './useOAuthSignIn';

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
};

export default function SupabaseAuthSocial({
  providers,
  layout,
  next,
}: SocialAuthProps) {
  const intl = useIntl();
  const { loading, signInWithProvider, errorMessage } = useOAuthSignIn({
    next,
  });

  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={clsx(
          'flex flex-col gap-y-4',
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
                className="rounded-md dark:!bg-neutral-800/40 dark:hover:!bg-neutral-700/40 dark:active:!bg-neutral-600/40"
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
                  signInWithProvider(provider);
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
