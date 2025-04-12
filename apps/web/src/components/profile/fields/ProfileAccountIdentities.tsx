import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiGithubFill,
  RiGoogleFill,
} from 'react-icons/ri';
import url from 'url';

import type { SupabaseProviderGFE } from '~/components/auth/SupabaseAuthSocial';
import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import { themeBorderColor, themeTextSuccessColor } from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { UserIdentity } from '@supabase/supabase-js';

type Props = Readonly<{
  userIdentities: ReadonlyArray<UserIdentity>;
}>;

export default function ProfileAccountIdentities({ userIdentities }: Props) {
  const intl = useIntl();
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useI18nRouter();
  const { showToast } = useToast();
  const supabaseClient = useSupabaseClientGFE();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState<Record<SupabaseProviderGFE, boolean>>({
    github: false,
    google: false,
  });
  const [showConfirmation, setShowConfirmation] = useState<{
    provider: SupabaseProviderGFE;
    shown: boolean;
  }>({
    provider: 'google',
    shown: false,
  });

  const confirmationMessage: Record<
    SupabaseProviderGFE,
    {
      description: string;
      title: string;
    }
  > = {
    github: {
      description: intl.formatMessage({
        defaultMessage:
          'Are you sure you want to disconnect your GitHub Auth account? This action can be reversed at any time.',
        description: 'Label to disconnect social',
        id: 'Xy4fEm',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Disconnect your GitHub Auth account',
        description: 'Label to disconnect social',
        id: '17hELe',
      }),
    },
    google: {
      description: intl.formatMessage({
        defaultMessage:
          'Are you sure you want to disconnect your Google Auth account? This action can be reversed at any time.',
        description: 'Label to disconnect social',
        id: 'B6YW6R',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Disconnect your Google Auth account',
        description: 'Label to disconnect social',
        id: 'TBD8mM',
      }),
    },
  };

  const successToastMessage: Record<
    SupabaseProviderGFE,
    {
      connect: string;
      disconnect: string;
    }
  > = useMemo(
    () => ({
      github: {
        connect: intl.formatMessage({
          defaultMessage:
            'Your GitHub Auth account has been successfully connected.',
          description: 'Success toast message for connected successfully',
          id: 'pQdokj',
        }),
        disconnect: intl.formatMessage({
          defaultMessage:
            'Your GitHub Auth account has been successfully disconnected.',
          description: 'Success toast message for connected successfully',
          id: 'hPruDA',
        }),
      },
      google: {
        connect: intl.formatMessage({
          defaultMessage:
            'Your Google Auth account has been successfully connected.',
          description: 'Success toast message for connected successfully',
          id: '8+aHha',
        }),
        disconnect: intl.formatMessage({
          defaultMessage:
            'Your Google Auth account has been successfully disconnected.',
          description: 'Success toast message for connected successfully',
          id: 'rk4UGh',
        }),
      },
    }),
    [intl],
  );

  const googleIdentity = userIdentities.find(
    (identity) => identity.provider === 'google',
  );
  const githubIdentity = userIdentities.find(
    (identity) => identity.provider === 'github',
  );

  const providerData: Record<
    SupabaseProviderGFE,
    {
      connected: boolean;
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
      provider: SupabaseProviderGFE;
    }
  > = {
    github: {
      connected: !!githubIdentity,
      icon: RiGithubFill,
      label: 'GitHub',
      provider: 'github',
    },
    google: {
      connected: !!googleIdentity,
      icon: RiGoogleFill,
      label: 'Google',
      provider: 'google',
    },
  };

  const providers = [providerData.google, providerData.github];

  async function onUnlinkUserIdentity(provider: SupabaseProviderGFE) {
    const identities = {
      github: githubIdentity,
      google: googleIdentity,
    };

    const identity = identities[provider];

    if (!identity) {
      return;
    }
    setLoading((prev) => ({ ...prev, provider: true }));

    const { error } = await supabaseClient.auth.unlinkIdentity(identity);

    setLoading((prev) => ({ ...prev, provider: false }));

    if (!error) {
      router.refresh();
      showToast({
        description: successToastMessage[provider].disconnect,
        title: intl.formatMessage({
          defaultMessage: 'Success!',
          description: 'Success toast message title for disconnect social',
          id: 'dWy8fS',
        }),
        variant: 'success',
      });
    } else {
      showToast({
        title:
          error.message ||
          intl.formatMessage({
            defaultMessage: 'Something went wrong',
            description: 'Error message',
            id: 'sbXDK4',
          }),
        variant: 'danger',
      });
    }
    setShowConfirmation((prev) => ({ ...prev, shown: false }));
  }

  async function onLinkUserIdentity(provider: SupabaseProviderGFE) {
    const redirectTo = new URL('/auth/oauth-redirect', window.location.origin);

    setLoading((prev) => ({ ...prev, provider: true }));

    const { error } = await supabaseClient.auth.linkIdentity({
      options: {
        redirectTo: url.format({
          pathname: redirectTo.href,
          query: {
            next: window.location.pathname,
            oauth: provider,
          },
        }),
      },
      provider,
    });

    setLoading((prev) => ({ ...prev, provider: false }));

    if (!error) {
      router.refresh();
    } else {
      showToast({
        title:
          error.message ||
          intl.formatMessage({
            defaultMessage: 'Something went wrong',
            description: 'Error message',
            id: 'sbXDK4',
          }),
        variant: 'danger',
      });
    }
  }

  // TODO(interviews): find a better way to handle this error and success scenario
  useEffect(() => {
    // Get error parameters from search params
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams?.get('error');
    const oauthProvider = searchParams?.get('oauth') as SupabaseProviderGFE;
    let errorDescription = searchParams?.get('error_description');

    if (isMounted) {
      if (error) {
        // Replace specific error with custom message
        if (
          errorDescription?.includes(
            'Identity is already linked to another user',
          )
        ) {
          errorDescription = intl.formatMessage({
            defaultMessage:
              'The social account is already associated with another user. Please try with different one.',
            description: 'Error message for existing social account',
            id: '6GBUHZ',
          });
        }
        showToast({
          title:
            errorDescription ||
            intl.formatMessage({
              defaultMessage: 'Something went wrong',
              description: 'Error message',
              id: 'sbXDK4',
            }),
          variant: 'danger',
        });
      } else if (oauthProvider === 'google' || oauthProvider === 'github') {
        showToast({
          description: successToastMessage[oauthProvider].connect,
          title: intl.formatMessage({
            defaultMessage: 'Success!',
            description: 'Success toast message title for disconnect social',
            id: 'dWy8fS',
          }),
          variant: 'success',
        });
      }
      if (error || oauthProvider) {
        window.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: sectionRef?.current?.offsetTop,
        });

        const updatedURL = new URL(
          window.location.pathname,
          window.location.origin,
        );

        // Need to clean the search params, otherwise the toast are shown every time the page is refreshed
        // since we are relying on search params to show the toast
        // Used history.replaceState instead of router.replace because using it reset the scroll position
        window.history.replaceState({}, '', updatedURL.toString());
      }
    }
    setIsMounted(true);
  }, [showToast, intl, isMounted, successToastMessage]);

  return (
    <div
      ref={sectionRef}
      className={clsx(
        'flex flex-col gap-4',
        'p-4',
        'rounded-lg border',
        themeBorderColor,
      )}>
      <Label
        description={intl.formatMessage({
          defaultMessage:
            'Manage your social account connections to GreatFrontEnd',
          description: 'Description social identities in account section',
          id: '0sbQ2I',
        })}
        label={intl.formatMessage({
          defaultMessage: 'Social Providers',
          description: 'Title social identities in account section',
          id: 'KSS6U5',
        })}
      />
      <div className="flex flex-col gap-2.5">
        {providers.map(({ icon: Icon, label, connected, provider }) => (
          <div
            key={provider}
            className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Icon className="size-4 shrink-0" />
                <Text size="body2">{label}</Text>
              </div>
              {connected && (
                <RiCheckboxCircleFill
                  className={clsx('size-4 shrink-0', themeTextSuccessColor)}
                />
              )}
            </div>
            {connected ? (
              <Button
                label={intl.formatMessage({
                  defaultMessage: 'Disconnect',
                  description: 'Label for unlink social identity button',
                  id: '+bR6HK',
                })}
                size="xs"
                variant="danger"
                onClick={() =>
                  setShowConfirmation({
                    provider,
                    shown: true,
                  })
                }
              />
            ) : (
              <Button
                isDisabled={loading[provider]}
                isLoading={loading[provider]}
                label={intl.formatMessage({
                  defaultMessage: 'Connect',
                  description: 'Label for link social identity button',
                  id: 'SKZHmt',
                })}
                size="xs"
                variant="secondary"
                onClick={() => onLinkUserIdentity(provider)}
              />
            )}
          </div>
        ))}
      </div>

      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Disconnect',
          description: 'Label for disconnect button',
          id: 'iFjPS9',
        })}
        isDisabled={loading[showConfirmation.provider]}
        isLoading={loading[showConfirmation.provider]}
        isShown={showConfirmation.shown}
        title={confirmationMessage[showConfirmation.provider].title}
        onCancel={() => {
          setShowConfirmation((prev) => ({ ...prev, shown: false }));
        }}
        onConfirm={() => onUnlinkUserIdentity(showConfirmation.provider)}>
        {confirmationMessage[showConfirmation.provider].description}
      </ConfirmationDialog>
    </div>
  );
}
