import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import fbq from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';
import { useAuthResendSignInConfirmation } from '~/hooks/user/useAuthFns';

import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';
import { useI18nRouter } from '~/next-i18nostic/src';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import type { AuthViewType } from './SupabaseAuthTypes';

export default function SupabaseAuthEmail({
  authView,
  id,
  setAuthView,
  supabaseClient,
  redirectTo,
  magicLink,
  showTitle,
}: {
  authView: 'sign_in' | 'sign_up';
  id: 'auth-sign-in' | 'auth-sign-up';
  magicLink?: boolean;
  redirectTo: string;
  setAuthView: (view: AuthViewType) => void;
  showTitle?: boolean;
  supabaseClient: SupabaseClientGFE;
}) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signUpForMarketingEmails, setSignUpForMarketingEmails] =
    useState(true);
  const { mutate: signUpWithEmail } =
    trpc.marketing.signUpWithEmail.useMutation();
  const resendSignInConfirmationMutation = useAuthResendSignInConfirmation();
  const intl = useIntl();
  const router = useI18nRouter();

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [authView]);

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

        const emailRedirectTo = window.location.origin + redirectTo;

        const { data, error: signUpError } = await supabaseClient.auth.signUp({
          email,
          options: {
            emailRedirectTo,
          },
          password,
        });

        setLoading(false);

        const { user: signUpUser, session: signUpSession } = data;

        if (signUpError) {
          setError(signUpError.message);
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
          // Redirect to email verify page.
          router.push(
            `/sign-up/verify?email=${encodeURIComponent(
              email,
            )}&redirect_to=${encodeURIComponent(emailRedirectTo)}`,
          );
        }

        if (signUpForMarketingEmails) {
          signUpWithEmail({
            email,
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

  return (
    <form id={id} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-6">
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
        <TextInput
          autoComplete="email"
          autoFocus={true}
          defaultValue={email}
          label={intl.formatMessage({
            defaultMessage: 'Email',
            description: 'Label of email field on Sign In/Up page',
            id: '9LT8eh',
          })}
          type="email"
          onChange={setEmail}
        />
        <TextInput
          defaultValue={password}
          label={intl.formatMessage({
            defaultMessage: 'Password',
            description: 'Label of password field on Sign In/Up page',
            id: 'jgIdRC',
          })}
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
        {(message || error) && (
          <div className="flex flex-col gap-y-2">
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
                {/* Hacky way to determine if the error is an unconfirmed email address error since no error codes are returned. */}
                {error.includes('confirmed') ? (
                  <>
                    {error}.{' '}
                    <Anchor
                      onClick={() => {
                        resendSignInConfirmationMutation.mutate({
                          email,
                          redirectTo: window.location.origin + redirectTo,
                        });
                      }}>
                      Send another verification email
                    </Anchor>
                  </>
                ) : (
                  error
                )}
              </Alert>
            )}
          </div>
        )}
        <Button
          display="block"
          isDisabled={loading}
          isLoading={loading}
          label={
            authView === 'sign_in'
              ? intl.formatMessage({
                  defaultMessage: 'Sign In',
                  description: 'Label of Sign In button on Email Sign In page',
                  id: '1gkgr4',
                })
              : intl.formatMessage({
                  defaultMessage: 'Sign Up',
                  description: 'Label of Sign Up button on Email Sign Up page',
                  id: 'tP5+Am',
                })
          }
          size="md"
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
        <Text
          className="mx-auto max-w-[284px] text-center"
          color="secondary"
          display="block"
          size="body3">
          <FormattedMessage
            defaultMessage="By proceeding, you agree to GreatFrontEnd's <tos>Terms of Service</tos> and <pp>Privacy Policy</pp>."
            description="Disclaimer of agreement to terms of service and privacy policy on Email Sign Up page"
            id="Y6CFPM"
            values={{
              pp: (chunks) => (
                <Anchor href="/legal/privacy-policy">{chunks}</Anchor>
              ),
              tos: (chunks) => <Anchor href="/legal/terms">{chunks}</Anchor>,
            }}
          />
        </Text>
      </div>
    </form>
  );
}
