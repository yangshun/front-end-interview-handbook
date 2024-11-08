import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeBorderColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import SupabaseAuthEmailSignIn from './SupabaseAuthEmailSignIn';
import SupabaseAuthEmailSignUp from './SupabaseAuthEmailSignUp';
import SupabaseAuthForgottenPassword from './SupabaseAuthForgottenPassword';
import type { SupabaseProviderGFE } from './SupabaseAuthSocial';
import SupabaseAuthSocial from './SupabaseAuthSocial';
import type { AuthViewType } from './SupabaseAuthTypes';
import { useAuthSignedInBefore } from './useAuthSignedInBefore';

export type Props = Readonly<{
  children?: React.ReactNode;
  className?: string;
  initialView?: AuthViewType;
  magicLink?: boolean;
  next: string;
  onlyThirdPartyProviders?: boolean;
  preBodyContents?: React.ReactNode;
  providers?: Array<SupabaseProviderGFE>;
  socialLayout?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuth({
  supabaseClient,
  className,
  socialLayout = 'vertical',
  preBodyContents,
  providers,
  initialView = 'sign_in',
  next,
  onlyThirdPartyProviders = false,
}: Props): JSX.Element | null {
  const [signedInBefore] = useAuthSignedInBefore();
  const [authView, setAuthView] = useState<AuthViewType>(
    initialView === 'sign_up' && signedInBefore ? 'sign_in' : initialView,
  );
  const hasThirdPartyProviders = providers != null && providers.length > 0;
  const searchParams = useSearchParams();
  const sourceSearchParam = searchParams?.get('source');

  function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Heading className="text-center" level="heading5">
                {authView === 'sign_in' ? (
                  sourceSearchParam === 'track_progress' ? (
                    <FormattedMessage
                      defaultMessage="Sign in to track your progress"
                      description="Subtitle of Sign In page"
                      id="ClNAgn"
                    />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Sign in to your account"
                      description="Subtitle of Sign In page"
                      id="urvIL3"
                    />
                  )
                ) : (
                  <FormattedMessage
                    defaultMessage="Create a new account"
                    description="Subtitle of Sign Up page"
                    id="KtYnhS"
                  />
                )}
              </Heading>
              <Section>
                <Text
                  className="block text-center"
                  color="secondary"
                  size="body2">
                  {authView === 'sign_in' && (
                    <FormattedMessage
                      defaultMessage="Don't have an account? <link>Sign up for free</link>"
                      description="Prompt for account creation on Email Sign In page"
                      id="4Bt00L"
                      values={{
                        link: (chunks) => (
                          <Anchor
                            href="#auth-sign-up"
                            onClick={(
                              e: React.MouseEvent<HTMLAnchorElement>,
                            ) => {
                              e.preventDefault();
                              logEvent('click', {
                                element: 'Auth page sign up button',
                                label:
                                  'Don\t have an account? Sign up for free',
                                namespace: 'auth',
                              });
                              setAuthView('sign_up');
                            }}>
                            {chunks}
                          </Anchor>
                        ),
                      }}
                    />
                  )}
                  {authView === 'sign_up' && (
                    <FormattedMessage
                      defaultMessage="Already have an account? <link>Sign in</link>"
                      description="Prompt for sign in on Email Sign Up page"
                      id="7Hng1e"
                      values={{
                        link: (chunks) => (
                          <Anchor
                            href="#auth-sign-in"
                            onClick={(
                              e: React.MouseEvent<HTMLAnchorElement>,
                            ) => {
                              e.preventDefault();
                              setAuthView('sign_in');
                              logEvent('click', {
                                element: 'Auth page sign in button',
                                label: 'Already have an account? Sign in',
                                namespace: 'auth',
                              });
                            }}>
                            {chunks}
                          </Anchor>
                        ),
                      }}
                    />
                  )}
                </Text>
              </Section>
            </div>
            <Section>
              <div className="flex flex-col gap-y-12">
                {preBodyContents}
                <SupabaseAuthSocial
                  layout={socialLayout}
                  next={next}
                  providers={providers}
                  supabaseClient={supabaseClient}
                />
              </div>
            </Section>
          </div>
          <Section>
            {hasThirdPartyProviders && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={clsx('w-full border-t', themeBorderColor)} />
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

  switch (authView) {
    case 'sign_in':
      return (
        <Container>
          <SupabaseAuthEmailSignIn
            next={next}
            setAuthView={setAuthView}
            supabaseClient={supabaseClient}
          />
        </Container>
      );
    case 'sign_up':
      return (
        <Container>
          <SupabaseAuthEmailSignUp
            next={next}
            supabaseClient={supabaseClient}
          />
        </Container>
      );
    case 'forgotten_password':
      return (
        <SupabaseAuthForgottenPassword
          next={next}
          setAuthView={setAuthView}
          supabaseClient={supabaseClient}
        />
      );
    default:
      return null;
  }
}
