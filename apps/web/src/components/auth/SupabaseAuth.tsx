import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import SupabaseAuthContinueWithEmail from './SupabaseAuthContinueWithEmail';
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
  const intl = useIntl();
  const [signedInBefore] = useAuthSignedInBefore();
  const [authView, setAuthView] = useState<AuthViewType>(
    initialView === 'sign_up' && signedInBefore ? 'sign_in' : initialView,
  );
  const hasThirdPartyProviders = providers != null && providers.length > 0;
  const searchParams = useSearchParams();
  const sourceSearchParam = searchParams?.get('source');

  const isAuthScreenWithSocial =
    authView === 'sign_in' || authView === 'sign_up';

  const showThirdPartyProviders =
    hasThirdPartyProviders && isAuthScreenWithSocial;

  function getAuthHeading() {
    switch (authView) {
      case 'sign_in':
        return sourceSearchParam === 'track_progress'
          ? intl.formatMessage({
              defaultMessage: 'Sign in to track your progress',
              description: 'Subtitle of Sign In page',
              id: 'ClNAgn',
            })
          : intl.formatMessage({
              defaultMessage: 'Sign in to your account',
              description: 'Subtitle of Sign In page',
              id: 'urvIL3',
            });
      case 'sign_up':
        return intl.formatMessage({
          defaultMessage: 'Create a new account',
          description: 'Subtitle of Sign Up page',
          id: 'KtYnhS',
        });
      case 'sign_in_with_email':
        return intl.formatMessage({
          defaultMessage: 'Sign in with email',
          description: 'Subtitle of Sign Up page',
          id: '7A1yG8',
        });
      case 'sign_up_with_email':
        return intl.formatMessage({
          defaultMessage: 'Sign up with email',
          description: 'Subtitle of Sign Up page',
          id: 'vo/aU3',
        });
      default:
        return '';
    }
  }

  function Container({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-1.5">
              {!isAuthScreenWithSocial && !onlyThirdPartyProviders && (
                <div>
                  <Button
                    addonPosition="start"
                    icon={RiArrowLeftLine}
                    label={intl.formatMessage({
                      defaultMessage: 'Back',
                      description: 'Button label for back button',
                      id: 'Dq9yul',
                    })}
                    size="xs"
                    variant="tertiary"
                    onClick={() => setAuthView('sign_in')}
                  />
                </div>
              )}
              <Heading className="text-center" level="heading5">
                {getAuthHeading()}
              </Heading>
              <Section>
                <Text
                  className="block text-center"
                  color="secondary"
                  size="body2">
                  {(authView === 'sign_in' ||
                    authView === 'sign_in_with_email') && (
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
                              setAuthView('sign_up_with_email');
                            }}>
                            {chunks}
                          </Anchor>
                        ),
                      }}
                    />
                  )}
                  {(authView === 'sign_up' ||
                    authView === 'sign_up_with_email') && (
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
                              setAuthView('sign_in_with_email');
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
            {(showThirdPartyProviders || preBodyContents) && (
              <Section>
                <div className="flex flex-col gap-y-12">
                  {preBodyContents}
                  {showThirdPartyProviders && (
                    <SupabaseAuthSocial
                      layout={socialLayout}
                      next={next}
                      providers={providers}
                    />
                  )}
                </div>
              </Section>
            )}
          </div>
          <Section>
            {showThirdPartyProviders && !onlyThirdPartyProviders && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className={clsx('w-full border-t', themeBorderElementColor)}
                  />
                </div>
                <div className="relative flex justify-center">
                  <span className={clsx('px-2', themeBackgroundColor)}>
                    <Text color="secondary" size="body2">
                      <FormattedMessage
                        defaultMessage="Or"
                        description="Label of divider preceding third party providers on Sign In page"
                        id="fTy7F4"
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
    case 'sign_up':
      return (
        <Container>
          <SupabaseAuthContinueWithEmail
            authView={authView}
            setAuthView={setAuthView}
          />
        </Container>
      );
    case 'sign_in_with_email':
      return (
        <Container>
          <SupabaseAuthEmailSignIn
            next={next}
            setAuthView={setAuthView}
            supabaseClient={supabaseClient}
          />
        </Container>
      );
    case 'sign_up_with_email':
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
