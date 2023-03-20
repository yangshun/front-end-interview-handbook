'use client';

import { useState } from 'react';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

export default function SupabaseAuthUpdatePassword() {
  const { isLoading: isUserLoading } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const user = useUser();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidPassword = password.length > 6 && password === confirmPassword;

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const { error: updateError } = await supabaseClient.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Your password has been updated');
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Heading className="flex-1 text-xl font-semibold">
          Change password for {user?.email}
        </Heading>
        {user?.app_metadata.provider !== 'email' && (
          <Text color="secondary" display="block" variant="body2">
            If you are logged in with OAuth (e.g. GitHub), you can set a
            password here to use email and password to log in instead.
          </Text>
        )}
      </div>
      <Section>
        {isUserLoading ? (
          <Spinner display="block" label="Loading" size="lg" />
        ) : (
          <form className="space-y-6" onSubmit={handlePasswordChange}>
            <TextInput
              autoComplete="password"
              defaultValue={password}
              description="Minimum 6 characters"
              isDisabled={isLoading}
              label="Password"
              type="password"
              onChange={setPassword}
            />
            <TextInput
              autoComplete="password"
              defaultValue={confirmPassword}
              isDisabled={isLoading}
              label="Repeat Password"
              type="password"
              onChange={setConfirmPassword}
            />
            <Button
              display="block"
              isDisabled={!isValidPassword || isLoading}
              isLoading={isLoading}
              label="Change password"
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
        )}
      </Section>
    </div>
  );
}
