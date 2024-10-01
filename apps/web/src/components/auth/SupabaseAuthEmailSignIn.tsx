import { useState } from 'react';
import url from 'url';
import { useIsMounted } from 'usehooks-ts';

import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';
import { useI18nRouter } from '~/next-i18nostic/src';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import AuthTermsOfServiceLine from './AuthTermsOfServiceLine';
import type { AuthViewType } from './SupabaseAuthTypes';

type Props = Readonly<{
  next: string;
  setAuthView: (view: AuthViewType) => void;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuthEmailSignIn({
  next,
  setAuthView,
  supabaseClient,
}: Props) {
  const isMounted = useIsMounted();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const intl = useIntl();
  const router = useI18nRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    const emailRedirectTo =
      window.location.origin +
      url.format({
        pathname: '/auth/login-success',
        query: {
          next,
        },
      });

    const { error: signInError } = await supabaseClient.auth.signInWithPassword(
      {
        email,
        password,
      },
    );

    setLoading(false);

    if (signInError != null) {
      logEvent('auth.sign_in.fail', {
        email,
        message: signInError.message,
        namespace: 'auth',
        type: 'email',
      });

      // Hacky way to determine if the error is an
      // unconfirmed email address error since no error codes are returned.
      if (signInError.message.includes('confirmed')) {
        // Redirect to email verify page.
        router.push({
          pathname: '/auth/unverified',
          query: {
            email,
            redirect_to: emailRedirectTo,
          },
        });

        return;
      }

      setError(signInError.message);

      return;
    }

    logEvent('auth.sign_in.success', {
      email,
      namespace: 'auth',
      type: 'email',
    });
    // Redirect to the next page is done in a hook on AuthPage.tsx.

    /**
     * It is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted()) {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
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
      <div>
        <Anchor
          className="text-sm"
          href="#"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            logEvent('click', {
              element: 'Auth page forgot your password button',
              label: 'Forgot your password?',
              namespace: 'auth',
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
      {message && (
        <Alert
          title={intl.formatMessage({
            defaultMessage: 'Signed up successfully',
            description: 'Title of alert indicating a successful email sign up',
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
      <Button
        display="block"
        isDisabled={loading}
        isLoading={loading}
        label={intl.formatMessage({
          defaultMessage: 'Sign In',
          description: 'Label of Sign In button on Email Sign In page',
          id: '1gkgr4',
        })}
        size="md"
        type="submit"
        variant="primary"
        onClick={() => {
          logEvent('auth.sign_in', {
            element: 'Auth page email sign in button',
            label: 'Sign in',
            namespace: 'auth',
          });
        }}
      />
      <AuthTermsOfServiceLine />
    </form>
  );
}
