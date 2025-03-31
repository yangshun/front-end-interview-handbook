'use client';

import { useState } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import logEvent from '~/logging/logEvent';
import { useI18nRouter } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import Alert from '../ui/Alert';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  next?: string | null;
  showTitle?: boolean;
}>;

export default function SupabaseAuthUpdatePassword({
  next,
  showTitle = true,
}: Props) {
  const intl = useIntl();
  const { isLoading: isUserLoading } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const user = useUser();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useI18nRouter();
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

    setIsLoading(false);

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

      // Ignore empty string and null-ish values.
      if (!next) {
        return;
      }

      router.push(next);
    }
  }

  return (
    <div className="flex flex-col gap-y-6">
      {(showTitle || user?.app_metadata.provider !== 'email') && (
        <div className="flex flex-col gap-y-2">
          {showTitle && (
            <Heading className="flex-1" level="heading6">
              {user?.email == null ? (
                <FormattedMessage
                  defaultMessage="Change password"
                  description="Title of Change Password page"
                  id="SLpcOX"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="Change password for {userEmail}"
                  description="Title of Change Password page"
                  id="gZL62Q"
                  values={{
                    userEmail: user?.email,
                  }}
                />
              )}
            </Heading>
          )}
          {user?.app_metadata.provider !== 'email' && (
            <Text className="block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="If you are logged in with OAuth (e.g. GitHub), you can set a password here to use email and password to log in instead."
                description="Tip to set password if third-party sign in methods were used, on Change Password page"
                id="apypGU"
              />
            </Text>
          )}
        </div>
      )}
      <Section>
        {isUserLoading ? (
          <Spinner
            display="block"
            label={intl.formatMessage({
              defaultMessage: 'Loading',
              description: 'Loading',
              id: 'Roh1pc',
            })}
            size="lg"
          />
        ) : (
          <form
            className="flex flex-col gap-y-6"
            onSubmit={handlePasswordChange}>
            <TextInput
              autoComplete="password"
              autoFocus={true}
              defaultValue={password}
              description={intl.formatMessage(
                {
                  defaultMessage:
                    'Minimum {minNumber} characters. Letters and digits required.',
                  description: 'Password creation criteria',
                  id: 'JUhFP/',
                },
                {
                  minNumber: 8,
                },
              )}
              isDisabled={isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Password',
                description: 'Label of password field on Change Password page',
                id: 'VVf84T',
              })}
              required={true}
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
              required={true}
              type="password"
              onChange={setConfirmPassword}
            />
            <div className="flex justify-end">
              <Button
                isDisabled={!isValidPassword || isLoading}
                isLoading={isLoading}
                label={intl.formatMessage({
                  defaultMessage: 'Change password',
                  description:
                    'Label of Change Password button on Change Password page',
                  id: 'd8XKhi',
                })}
                type="submit"
                variant="secondary"
                onClick={() => {
                  logEvent('auth.password.change', {
                    element: 'Auth page change password button',
                    label: 'Change password',
                    namespace: 'auth',
                  });
                }}
              />
            </div>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
          </form>
        )}
      </Section>
    </div>
  );
}
