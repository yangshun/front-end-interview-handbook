import { useState } from 'react';

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
        'An email will be sent to the address above if an associated account exists',
      );
    }
    setLoading(false);
  }

  return (
    <form id="auth-forgot-password" onSubmit={handlePasswordReset}>
      <div className="space-y-8">
        {showTitle && (
          <Heading className="text-3xl font-bold text-slate-900">
            Reset password
          </Heading>
        )}
        <Section>
          <div className="space-y-6">
            <TextInput
              autoComplete="email"
              defaultValue={email}
              label="Email"
              startIcon={EnvelopeIcon}
              type="email"
              onChange={setEmail}
            />
            <Button
              display="block"
              isDisabled={loading}
              isLoading={loading}
              label="Send reset password instructions"
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
              Go back to sign in
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
