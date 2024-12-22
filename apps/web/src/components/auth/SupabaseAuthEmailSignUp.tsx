import { useState } from 'react';
import url from 'url';
import { useIsMounted } from 'usehooks-ts';

import { fbqGFE } from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import TextInput from '~/components/ui/TextInput';

import triggerWelcomeSeriesEmail from '~/emails/items/welcome/EmailsTriggerWelcomeSeries';
import logEvent from '~/logging/logEvent';
import { useI18nRouter } from '~/next-i18nostic/src';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import AuthTermsOfServiceLine from './AuthTermsOfServiceLine';

type Props = Readonly<{
  next: string;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuthEmailSignUp({
  next,
  supabaseClient,
}: Props) {
  const isMounted = useIsMounted();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [signUpForMarketingEmails, setSignUpForMarketingEmails] =
    useState(true);
  const { mutate: signUpWithEmail } =
    trpc.marketing.signUpWithEmail.useMutation();
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

    fbqGFE('track', 'CompleteRegistration');

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
      if (signUpError.status === 429) {
        setError(
          intl.formatMessage({
            defaultMessage: 'Email rate limit exceeded. Please try again later',
            description: 'Sign up error message',
            id: 'G38r8R',
          }),
        );
      } else {
        setError(signUpError.message);
      }

      logEvent('auth.sign_up.fail', {
        email,
        message: signUpError.message,
        namespace: 'auth',
        type: 'email',
      });

      return;
    }

    if (signUpForMarketingEmails) {
      signUpWithEmail({
        email,
      });
    }

    if (signUpUser && !signUpSession) {
      // Existing users will also sign up successfully but a dummy user is returned.
      // There's mostly no differentiation in with new user sign ups so that hackers cannot tell whether it's a new or existing user.

      // The difference is that the identities array for new users is non-empty.
      // We can use that as a hacky way to determine if it's an existing user and tell them to sign in instead.
      // https://github.com/orgs/supabase/discussions/1282
      if (signUpUser.identities?.length === 0) {
        logEvent('auth.sign_up.existing_user', {
          email,
          namespace: 'auth',
          type: 'email',
        });

        setError('Account already exists, sign in instead');

        return;
      }

      logEvent('auth.sign_up.success', {
        email,
        namespace: 'auth',
        type: 'email',
      });

      // Trigger welcome email
      triggerWelcomeSeriesEmail({
        email,
        name: '',
        signedUpViaInterviews: !next?.includes('/projects'), // To determine if the signup was triggered from projects or interviews
        userId: signUpUser.id,
      });

      // Redirect to email verify page.
      router.push({
        pathname: '/auth/verification-sent',
        query: {
          email,
          redirect_to: emailRedirectTo,
        },
      });
    }

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
          defaultMessage: 'Sign Up',
          description: 'Label of Sign Up button on Email Sign Up page',
          id: 'tP5+Am',
        })}
        size="md"
        type="submit"
        variant="primary"
        onClick={() => {
          logEvent('auth.sign_up', {
            element: 'Auth page email sign up button',
            label: 'Sign up',
            namespace: 'auth',
          });
        }}
      />
      <AuthTermsOfServiceLine />
    </form>
  );
}
