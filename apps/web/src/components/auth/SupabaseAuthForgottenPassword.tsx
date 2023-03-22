import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import type { AuthViewType } from './SupabaseAuthTypes';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  setAuthView: (view: AuthViewType) => void;
  showTitle?: boolean;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuthForgottenPassword({
  setAuthView,
  supabaseClient,
  showTitle,
}: Props) {
  const intl = useIntl();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error: resetError } =
      await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/password/reset',
      });

    if (resetError) {
      setError(resetError.message);
    } else {
      setMessage(
        intl.formatMessage({
          defaultMessage:
            'An email will be sent to the address above if an associated account exists',
          description: 'Message indicating a successful password reset request',
          id: 'O4XAXC',
        }),
      );
    }
    setLoading(false);
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <div className="space-y-8">
        {showTitle && (
          <Heading className="text-3xl font-bold text-slate-900">
            <FormattedMessage
              defaultMessage="Reset password"
              description="Title of Password Reset page"
              id="aPfuzs"
            />
          </Heading>
        )}
        <Section>
          <div className="space-y-6">
            <TextInput
              autoComplete="email"
              defaultValue={email}
              label={intl.formatMessage({
                defaultMessage: 'Email',
                description: 'Label of email field on Password Reset page',
                id: 'vx/nPL',
              })}
              startIcon={EnvelopeIcon}
              type="email"
              onChange={setEmail}
            />
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
              size="lg"
              type="submit"
              variant="primary"
            />
          </div>
          <div>
            <Anchor
              className="text-sm"
              href="#auth-sign-in"
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
          {message && (
            <Text color="success" display="block" variant="body2">
              {message}
            </Text>
          )}
          {error && (
            <Text color="error" display="block" variant="body2">
              {error}
            </Text>
          )}
        </Section>
      </div>
    </form>
  );
}
