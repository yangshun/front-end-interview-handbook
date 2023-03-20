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
  redirectTo: string;
  setAuthView: (view: AuthViewType) => void;
  showTitle?: boolean;
  supabaseClient: SupabaseClientGFE;
}>;

export default function SupabaseAuthMagicLink({
  setAuthView,
  supabaseClient,
  redirectTo,
  showTitle,
}: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleMagicLinkSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error: signInError } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + redirectTo },
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      setMessage('Check your email for the magic link');
    }

    setLoading(false);
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <div className="space-y-8">
        {showTitle && (
          <Heading className="text-3xl font-bold text-slate-900">
            Sign in
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
              label="Send magic link"
              size="lg"
              type="submit"
              variant="secondary"
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
              Sign in with password
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
