'use client';

import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

export default function SupabaseAuthUpdatePassword() {
  const intl = useIntl();
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
      setMessage(
        intl.formatMessage({
          defaultMessage: 'Your password has been updated',
          description: 'Message indicating a successful password update',
          id: '8Ti6rm',
        }),
      );
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <Heading className="flex-1" level="heading6">
          <FormattedMessage
            defaultMessage="Change password for {userEmail}"
            description="Title of Change Password page"
            id="gZL62Q"
            values={{
              userEmail: user?.email,
            }}
          />
        </Heading>
        {user?.app_metadata.provider !== 'email' && (
          <Text color="secondary" display="block" size="body2">
            <FormattedMessage
              defaultMessage="If you are logged in with OAuth (e.g. GitHub), you can set a
            password here to use email and password to log in instead."
              description="Tip to set password if third-party sign in methods were used, on Change Password page"
              id="jNXBSj"
            />
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
              description={intl.formatMessage({
                defaultMessage: 'Minimum 6 characters',
                description:
                  'Description of password field indicating minimum character count, on Change Password page',
                id: '3AfCoE',
              })}
              isDisabled={isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Password',
                description: 'Label of password field on Change Password page',
                id: 'VVf84T',
              })}
              type="password"
              onChange={setPassword}
            />
            <TextInput
              autoComplete="password"
              defaultValue={confirmPassword}
              isDisabled={isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Repeat Password',
                description:
                  'Label of confirm password field on Change Password page',
                id: 'zn3iWx',
              })}
              type="password"
              onChange={setConfirmPassword}
            />
            <Button
              display="block"
              isDisabled={!isValidPassword || isLoading}
              isLoading={isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Change password',
                description:
                  'Label of Change Password button on Change Password page',
                id: 'd8XKhi',
              })}
              size="lg"
              type="submit"
              variant="primary"
              onClick={() => {
                logEvent('auth.password.change', {
                  element: 'Auth page change password button',
                  label: 'Change password',
                });
              }}
            />
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
          </form>
        )}
      </Section>
    </div>
  );
}
