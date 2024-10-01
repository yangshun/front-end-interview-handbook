import clsx from 'clsx';
import { useEffect, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiGithubLine,
  RiGoogleLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import type { SupabaseProviderGFE } from '~/components/auth/SupabaseAuthSocial';
import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
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
      icon: RiGithubLine,
      label: 'GitHub',
      provider: 'github',
    },
    google: {
      connected: !!googleIdentity,
      icon: RiGoogleLine,
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
    const redirectTo = new URL(
      window.location.pathname,
      window.location.origin,
    );

    setLoading((prev) => ({ ...prev, provider: true }));

    const { error } = await supabaseClient.auth.linkIdentity({
      options: {
        redirectTo: redirectTo.href,
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

  // TODO(interviews): find a better way to handle this error scenario
  useEffect(() => {
    // Get error parameters from search params
    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams?.get('error');
    let errorDescription = searchParams?.get('error_description');

    if (error && isMounted) {
      // Replace specific error with custom message
      if (
        errorDescription?.includes('Identity is already linked to another user')
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
    }
    setIsMounted(true);
  }, [showToast, intl, isMounted]);

  return (
    <div
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
        isDisabled={loading[showConfirmation.provider]}
        isLoading={loading[showConfirmation.provider]}
        isShown={showConfirmation.shown}
        title={intl.formatMessage({
          defaultMessage: 'Disconnect social',
          description: 'Label to disconnect social',
          id: 'ypn/En',
        })}
        onCancel={() => {
          setShowConfirmation((prev) => ({ ...prev, shown: false }));
        }}
        onConfirm={() => onUnlinkUserIdentity(showConfirmation.provider)}>
        <FormattedMessage
          defaultMessage="You will disconnect this social. Are you sure?"
          description="Confirmation text for disconnecting social"
          id="wBgo1q"
        />
      </ConfirmationDialog>
    </div>
  );
}
