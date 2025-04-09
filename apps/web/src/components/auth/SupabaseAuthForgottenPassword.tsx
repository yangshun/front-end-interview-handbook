import { useState } from 'react';
import url from 'url';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';
import logMessage from '~/logging/logMessage';
import { i18nHref, useI18n, useI18nRouter } from '~/next-i18nostic/src';
import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import type { AuthViewType } from './SupabaseAuthTypes';
import Alert from '../ui/Alert';

type Props = Readonly<{
  next: string;
  setAuthView: (view: AuthViewType) => void;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuthForgottenPassword({
  next,
  setAuthView,
  supabaseClient,
}: Props) {
  const intl = useIntl();
  const router = useI18nRouter();
  const { locale } = useI18n();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const { error: resetError } =
      await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo:
          window.location.origin +
          url.format(
            i18nHref(
              {
                pathname: '/auth/password-reset',
                query: {
                  next,
                },
              },
              locale,
            ),
          ),
      });

    setLoading(false);
    if (resetError) {
      if (resetError.status === 429) {
        setError(
          intl.formatMessage({
            defaultMessage: 'Email rate limit exceeded. Please try again later',
            description: 'Sign up error message',
            id: 'G38r8R',
          }),
        );
      } else {
        setError(resetError.message);
      }

      logMessage({
        level: 'error',
        message: resetError.message,
        namespace: 'auth',
        title: 'Reset password error',
        userIdentifier: email,
      });
      logEvent('auth.password.reset.fail', {
        email,
        message: resetError.message,
        namespace: 'auth',
        type: 'email',
      });

      return;
    }

    logEvent('auth.password.reset.success', {
      email,
      namespace: 'auth',
      type: 'email',
    });

    router.push({
      pathname: '/auth/password-reset-sent',
      query: {
        next,
      },
    });
  }

  return (
    <form className="flex flex-col gap-y-12" onSubmit={handlePasswordReset}>
      <Heading className="text-center" level="heading5">
        <FormattedMessage
          defaultMessage="Reset password"
          description="Title of Password Reset page"
          id="aPfuzs"
        />
      </Heading>
      <Section>
        <div className="flex flex-col gap-y-6">
          <TextInput
            autoComplete="email"
            autoFocus={true}
            defaultValue={email}
            isDisabled={loading}
            label={intl.formatMessage({
              defaultMessage: 'Email',
              description: 'Label of email field on Password Reset page',
              id: 'vx/nPL',
            })}
            required={true}
            type="email"
            onChange={setEmail}
          />
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
              defaultMessage: 'Send reset password instructions',
              description:
                'Label of password reset button on Password Reset page',
              id: 'dz24ro',
            })}
            size="md"
            type="submit"
            variant="primary"
            onClick={() => {
              logEvent('auth.password.reset', {
                element: 'Reset password button',
                label: 'Send reset password instructions',
                namespace: 'auth',
              });
            }}
          />
          <div className="text-center">
            <Anchor
              className="text-sm"
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView('sign_in');
              }}>
              <FormattedMessage
                defaultMessage="Go back to sign in"
                description="Label of link to return to Sign In Page on Password Reset page"
                id="uCbhIG"
              />
            </Anchor>
          </div>
        </div>
      </Section>
    </form>
  );
}
