'use client';

import { useState } from 'react';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  user: User;
}>;

export default function ProfileAccount({ user }: Props) {
  const supabaseClient = useSupabaseClientGFE();
  const [email, setEmail] = useState(user?.email ?? '');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = /^\S+@\S+\.\S+$/.test(email);

  async function handleEmailChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const { error: updateError } = await supabaseClient.auth.updateUser({
      email,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage(
        'A confirmation link has been sent to the new email address. The email will not be changed until the confirmation link has been accessed.',
      );
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-y-6 md:max-w-md">
      <Heading className="sr-only">Account Settings</Heading>
      {user?.app_metadata.provider !== 'email' && (
        <Text color="secondary" display="block" variant="body2">
          If you are logged in with OAuth (e.g. GitHub), you can change your
          email here to use email and password to log in instead.
        </Text>
      )}
      <Section>
        <form className="space-y-6" onSubmit={handleEmailChange}>
          <TextInput
            autoComplete="email"
            defaultValue={email}
            isDisabled={isLoading}
            label="Email"
            type="email"
            onChange={setEmail}
          />
          <Button
            display="block"
            isDisabled={email === user?.email || !isValidEmail || isLoading}
            isLoading={isLoading}
            label="Save Changes"
            type="submit"
            variant="primary"
          />
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
        </form>
      </Section>
    </div>
  );
}
