import { useI18nRouter } from 'next-i18nostic';
import { useEffect, useRef, useState } from 'react';

import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

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

          return;
        }

        router.push(redirectTo);
        break;
      }
      case 'sign_up': {
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

          return;
        }

        if (signUpUser && !signUpSession) {
          // Check if session is null -> email confirmation setting is turned on
          setMessage('Check your email for the confirmation link.');
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
          <Heading className="text-3xl font-bold text-slate-900">
            {authView === 'sign_in' ? (
              <>Sign in to your account</>
            ) : (
              <>Sign up for an account</>
            )}
          </Heading>
        )}
        <div className="space-y-6">
          <TextInput
            autoComplete="email"
            defaultValue={email}
            label="Email"
            startIcon={EnvelopeIcon}
            type="email"
            onChange={setEmail}
          />
          <div className="space-y-2">
            <TextInput
              defaultValue={password}
              label="Password"
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
                    setAuthView('forgotten_password');
                  }}>
                  Forgot your password?
                </Anchor>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-y-8">
          {authView === 'sign_up' && (
            <CheckboxInput
              label="I would like to sign up for GreatFrontEnd's newsletter to receive interview tips and question updates"
              value={signUpForMarketingEmails}
              onChange={(value) => {
                setSignUpForMarketingEmails(value);
              }}
            />
          )}
          {message && (
            <Alert title="Signed up successfully" variant="info">
              {message}
            </Alert>
          )}
          {error && (
            <Alert title="An error has occurred" variant="danger">
              {error}
            </Alert>
          )}
          <div className="grid gap-y-6">
            <Button
              display="block"
              isDisabled={loading}
              isLoading={loading}
              label={authView === 'sign_in' ? 'Sign In' : 'Sign Up'}
              size="lg"
              type="submit"
              variant="primary"
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
                  Sign in with magic link
                </Anchor>
              </div>
            )}
            {authView === 'sign_in' ? (
              <Text
                className="text-center"
                color="secondary"
                display="block"
                variant="body">
                Don't have an account?{' '}
                <Anchor
                  href="#auth-sign-up"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleViewChange('sign_up');
                  }}>
                  Sign up for free
                </Anchor>
              </Text>
            ) : (
              <div className="flex flex-col gap-6">
                <Text
                  className="text-center"
                  color="secondary"
                  display="block"
                  variant="body">
                  Already have an account?{' '}
                  <Anchor
                    href="#auth-sign-in"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault();
                      handleViewChange('sign_in');
                    }}>
                    Sign in
                  </Anchor>
                </Text>
              </div>
            )}
            <hr />
            <Text color="secondary" display="block" variant="body3">
              By proceeding, you agree to GreatFrontEnd's{' '}
              <Anchor href="/legal/terms">Terms of Service</Anchor> and{' '}
              <Anchor href="/legal/privacy-policy">Privacy Policy</Anchor>.
            </Text>
          </div>
        </div>
      </div>
    </form>
  );
}
