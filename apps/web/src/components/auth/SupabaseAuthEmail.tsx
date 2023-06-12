import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import fbq from '~/lib/fbq';

import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeLineColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';
import { useI18nRouter } from '~/next-i18nostic/src';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import type { AuthViewType } from './SupabaseAuthTypes';

import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function SupabaseAuthEmail({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  magicLink,
  showTitle,
}: {
  authView: AuthViewType;
  defaultEmail: string;
  defaultPassword: string;
  id: 'auth-sign-in' | 'auth-sign-up';
  magicLink?: boolean;
  redirectTo: string;
  setAuthView: (view: AuthViewType) => void;
  setDefaultEmail: (email: string) => void;
  setDefaultPassword: (password: string) => void;
  showTitle?: boolean;
  supabaseClient: SupabaseClientGFE;
}) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signUpForMarketingEmails, setSignUpForMarketingEmails] =
    useState(true);
  const intl = useIntl();
  const router = useI18nRouter();

  useEffect(() => {
    isMounted.current = true;
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView, defaultEmail, defaultPassword]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    switch (authView) {
      case 'sign_in': {
        const { error: signInError } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password,
          });

        setLoading(false);
        if (signInError) {
          setError(signInError.message);
          logMessage({
            level: 'error',
            message: signInError.message,
            title: 'Sign in error',
            userIdentifier: email,
          });
          logEvent('auth.sign_in.fail', {
            email,
            message: signInError.message,
            type: 'email',
          });

          return;
        }

        logEvent('auth.sign_in.success', {
          email,
          type: 'email',
        });
        router.push(redirectTo);
        break;
      }
      case 'sign_up': {
        fbq.track('CompleteRegistration');

        const { data, error: signUpError } = await supabaseClient.auth.signUp({
          email,
          options: {
            emailRedirectTo: window.location.origin + redirectTo,
          },
          password,
        });

        setLoading(false);

        const { user: signUpUser, session: signUpSession } = data;

        if (signUpError) {
          setError(signUpError.message);
          logMessage({
            level: 'error',
            message: signUpError.message,
            title: 'Sign up error',
            userIdentifier: email,
          });
          logEvent('auth.sign_up.fail', {
            email,
            message: signUpError.message,
            type: 'email',
          });

          return;
        }

        if (signUpUser && !signUpSession) {
          logEvent('auth.sign_up.success', {
            email,
            type: 'email',
          });
          // Check if session is null -> email confirmation setting is turned on
          setMessage(
            intl.formatMessage({
              defaultMessage: 'Check your email for the confirmation link.',
              description:
                'Content of alert indicating a successful email sign up',
              id: 'a6L95B',
            }),
          );
        }

        if (signUpForMarketingEmails) {
          await fetch('/api/marketing/email-signup', {
            body: JSON.stringify({
              email,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        }
        break;
      }
    }

    /**
     * It is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) {
      setLoading(false);
    }
  }

  function handleViewChange(newView: AuthViewType) {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  }

  return (
    <form id={id} onSubmit={handleSubmit}>
      <div className="space-y-6">
        {showTitle && (
          <Heading level="heading4">
            {authView === 'sign_in' ? (
              <FormattedMessage
                defaultMessage="Sign in to your account"
                description="Title of Email Sign In page"
                id="ZCTrb8"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Sign up for an account"
                description="Title of Email Sign Up page"
                id="Vvc37/"
              />
            )}
          </Heading>
        )}
        <div className="space-y-6">
          <TextInput
            autoComplete="email"
            defaultValue={email}
            label={intl.formatMessage({
              defaultMessage: 'Email',
              description: 'Label of email field on Sign In/Up page',
              id: '9LT8eh',
            })}
            startIcon={EnvelopeIcon}
            type="email"
            onChange={setEmail}
          />
          <div className="space-y-2">
            <TextInput
              defaultValue={password}
              label={intl.formatMessage({
                defaultMessage: 'Password',
                description: 'Label of password field on Sign In/Up page',
                id: 'jgIdRC',
              })}
              startIcon={KeyIcon}
              type="password"
              onChange={setPassword}
            />
            {authView === 'sign_in' && (
              <div>
                <Anchor
                  className="text-sm"
                  href="#auth-forgot-password"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    logEvent('click', {
                      element: 'Auth page forgot your password button',
                      label: 'Forgot your password?',
                    });
                    setAuthView('forgotten_password');
                  }}>
                  <FormattedMessage
                    defaultMessage="Forgot your password?"
                    description="Label of forget password button on Email Sign In page"
                    id="XVPYZg"
                  />
                </Anchor>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-y-8">
          {authView === 'sign_up' && (
            <CheckboxInput
              label={intl.formatMessage({
                defaultMessage:
                  "I would like to sign up for GreatFrontEnd's newsletter to receive interview tips and question updates",
                description:
                  'Label of checkbox to sign up for newsletter on Email Sign Up page',
                id: 'KmiBbk',
              })}
              value={signUpForMarketingEmails}
              onChange={(value) => {
                setSignUpForMarketingEmails(value);
              }}
            />
          )}
          {message && (
            <Alert
              title={intl.formatMessage({
                defaultMessage: 'Signed up successfully',
                description:
                  'Title of alert indicating a successful email sign up',
                id: 'I5MeD9',
              })}
              variant="info">
              {message}
            </Alert>
          )}
          {error && (
            <Alert
              title={intl.formatMessage({
                defaultMessage: 'An error has occurred',
                description:
                  'Title of alert indicating an error on Email Sign In/Up Page',
                id: 'YM1bnf',
              })}
              variant="danger">
              {error}
            </Alert>
          )}
          <div className="grid gap-y-6">
            <Button
              display="block"
              isDisabled={loading}
              isLoading={loading}
              label={
                authView === 'sign_in'
                  ? intl.formatMessage({
                      defaultMessage: 'Sign In',
                      description:
                        'Label of Sign In button on Email Sign In page',
                      id: '1gkgr4',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Sign Up',
                      description:
                        'Label of Sign Up button on Email Sign Up page',
                      id: 'tP5+Am',
                    })
              }
              size="lg"
              type="submit"
              variant="primary"
              onClick={() => {
                if (authView === 'sign_in') {
                  logEvent('auth.sign_in', {
                    element: 'Auth page email sign in button',
                    label: 'Sign in',
                  });
                }

                if (authView === 'sign_up') {
                  logEvent('auth.sign_up', {
                    element: 'Auth page email sign up button',
                    label: 'Sign up',
                  });
                }
              }}
            />
            {authView === 'sign_in' && magicLink && (
              <div>
                <Anchor
                  className="text-sm"
                  href="#auth-magic-link"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setAuthView('magic_link');
                  }}>
                  <FormattedMessage
                    defaultMessage="Sign in with magic link"
                    description="Label of magic link sign in button on Email Sign In page"
                    id="qAxlQN"
                  />
                </Anchor>
              </div>
            )}
            {authView === 'sign_in' ? (
              <Text
                className="text-center"
                color="secondary"
                display="block"
                variant="body">
                <FormattedMessage
                  defaultMessage="Don't have an account? <link>Sign up for free</link>"
                  description="Prompt for account creation on Email Sign In page"
                  id="4Bt00L"
                  values={{
                    link: (chunks) => (
                      <Anchor
                        href="#auth-sign-up"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          logEvent('click', {
                            element: 'Auth page sign up button',
                            label: 'Don\t have an account? Sign up for free',
                          });
                          handleViewChange('sign_up');
                        }}>
                        {chunks}
                      </Anchor>
                    ),
                  }}
                />
              </Text>
            ) : (
              <div className="flex flex-col gap-6">
                <Text
                  className="text-center"
                  color="secondary"
                  display="block"
                  variant="body">
                  <FormattedMessage
                    defaultMessage="Already have an account? <link>Sign in</link>"
                    description="Prompt for sign in on Email Sign Up page"
                    id="7Hng1e"
                    values={{
                      link: (chunks) => (
                        <Anchor
                          href="#auth-sign-in"
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault();
                            handleViewChange('sign_in');
                            logEvent('click', {
                              element: 'Auth page sign in button',
                              label: 'Already have an account? Sign in',
                            });
                          }}>
                          {chunks}
                        </Anchor>
                      ),
                    }}
                  />
                </Text>
              </div>
            )}
            <hr className={themeLineColor} />
            <Text color="secondary" display="block" variant="body3">
              <FormattedMessage
                defaultMessage="By proceeding, you agree to GreatFrontEnd's <tos>Terms of Service</tos> and <pp>Privacy Policy</pp>."
                description="Disclaimer of agreement to terms of service and privacy policy on Email Sign Up page"
                id="Y6CFPM"
                values={{
                  pp: (chunks) => (
                    <Anchor href="/legal/privacy-policy">{chunks}</Anchor>
                  ),
                  tos: (chunks) => (
                    <Anchor href="/legal/terms">{chunks}</Anchor>
                  ),
                }}
              />
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
}
