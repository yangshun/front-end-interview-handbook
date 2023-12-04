import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';

import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import SupabaseAuthEmail from './SupabaseAuthEmail';
import SupabaseAuthForgottenPassword from './SupabaseAuthForgottenPassword';
import SupabaseAuthMagicLink from './SupabaseAuthMagicLink';
import type { SupabaseProviderGFE } from './SupabaseAuthSocial';
import SupabaseAuthSocial from './SupabaseAuthSocial';
import type { AuthViewType } from './SupabaseAuthTypes';

export type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  magicLink?: boolean;
  onlyThirdPartyProviders?: boolean;
  preBodyContents?: React.ReactNode;
  providers?: Array<SupabaseProviderGFE>;
  redirectTo: string;
  socialLayout?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  supabaseClient: SupabaseClientGFE;
  view?: AuthViewType;
}>;

export default function Auth({
  supabaseClient,
  className,
  socialLayout = 'vertical',
  preBodyContents,
  providers,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  magicLink = false,
}: Props): JSX.Element | null {
  const [authView, setAuthView] = useState<AuthViewType>(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');
  const hasThirdPartyProviders = providers != null && providers.length > 0;

  function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-10">
            <Heading className="text-center" level="heading4">
              {authView === 'sign_in' ? (
                <FormattedMessage
                  defaultMessage="Sign in to your account"
                  description="Subtitle of Sign In page"
                  id="urvIL3"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Create a new account"
                  description="Subtitle of Sign Up page"
                  id="KtYnhS"
                />
              )}
            </Heading>
            <Section>
              <div className="flex flex-col gap-y-12">
                {preBodyContents}
                <SupabaseAuthSocial
                  layout={socialLayout}
                  providers={providers}
                  redirectTo={redirectTo}
                  supabaseClient={supabaseClient}
                />
              </div>
            </Section>
          </div>
          <Section>
            {hasThirdPartyProviders && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={clsx('w-full border-t', themeLineColor)} />
                </div>
                <div className="relative flex justify-center">
                  <span className={clsx('px-2', themeBackgroundColor)}>
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="Or continue with"
                        description="Label of divider preceding third party providers on Sign In page"
                        id="ugHQqC"
                      />
                    </Text>
                  </span>
                </div>
              </div>
            )}
            {!onlyThirdPartyProviders && children}
          </Section>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Handle view override
    setAuthView(view);
  }, [view]);

  switch (authView) {
    case 'sign_in':
    case 'sign_up':
      return (
        <Container>
          <SupabaseAuthEmail
            authView={authView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            id={authView === 'sign_up' ? 'auth-sign-up' : 'auth-sign-in'}
            magicLink={magicLink}
            redirectTo={redirectTo}
            setAuthView={setAuthView}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            showTitle={!hasThirdPartyProviders}
            supabaseClient={supabaseClient}
          />
        </Container>
      );

    case 'forgotten_password':
      return (
        <Container>
          <SupabaseAuthForgottenPassword
            setAuthView={setAuthView}
            showTitle={!hasThirdPartyProviders}
            supabaseClient={supabaseClient}
          />
        </Container>
      );

    case 'magic_link':
      return (
        <Container>
          <SupabaseAuthMagicLink
            redirectTo={redirectTo}
            setAuthView={setAuthView}
            showTitle={!hasThirdPartyProviders}
            supabaseClient={supabaseClient}
          />
        </Container>
      );

    default:
      return null;
  }
}

Auth.ForgottenPassword = SupabaseAuthForgottenPassword;
Auth.MagicLink = SupabaseAuthMagicLink;