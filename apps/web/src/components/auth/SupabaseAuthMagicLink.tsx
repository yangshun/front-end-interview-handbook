import { useState } from 'react';
import { RiMailLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { SupabaseClientGFE } from '~/supabase/SupabaseServerGFE';

import type { AuthViewType } from './SupabaseAuthTypes';

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
  const intl = useIntl();
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
      setMessage(
        intl.formatMessage({
          defaultMessage: 'Check your email for the magic link',
          description: 'Message indicating a successful magic link request',
          id: 'taVYcT',
        }),
      );
    }

    setLoading(false);
  }

  return (
    <form id="auth-magic-link" onSubmit={handleMagicLinkSignIn}>
      <div className="space-y-8">
        {showTitle && (
          <Heading level="heading4">
            <FormattedMessage
              defaultMessage="Sign in"
              description="Title of Magic Link Sign In page"
              id="TcVgOJ"
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
                description: 'Label of email field on Magic Link Sign In page',
                id: 'UHZyhq',
              })}
              startIcon={RiMailLine}
              type="email"
              onChange={setEmail}
            />
            <Button
              display="block"
              isDisabled={loading}
              isLoading={loading}
              label={intl.formatMessage({
                defaultMessage: 'Send magic link',
                description:
                  'Label of send magic link button on Magic Link Sign In page',
                id: 'wbjMPn',
              })}
              size="md"
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
              <FormattedMessage
                defaultMessage="Sign in with password"
                description="Label of link to go to Password Sign In Page on Magic Link Sign In page"
                id="CDrriz"
              />
            </Anchor>
          </div>
          {message && (
            <Text color="success" display="block" size="body2">
              {message}
            </Text>
          )}
          {error && (
            <Text color="error" display="block" size="body2">
              {error}
            </Text>
          )}
        </Section>
      </div>
    </form>
  );
}
