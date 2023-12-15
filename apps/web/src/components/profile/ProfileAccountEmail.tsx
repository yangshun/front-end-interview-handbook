import clsx from 'clsx';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import { themeLineColor } from '../ui/theme';

import type { User } from '@supabase/supabase-js';

type Props = Readonly<{
  user: User;
}>;

export default function ProfileAccountEmail({ user }: Props) {
  const intl = useIntl();
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
        intl.formatMessage({
          defaultMessage:
            'A confirmation link has been sent to the new email address. The email will not be changed until the confirmation link has been accessed.',
          description:
            'Message shown after an email change request is successful.',
          id: 'zs7+sC',
        }),
      );
    }
    setIsLoading(false);
  }

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeLineColor)}>
      <form className="space-y-6 mt-2" onSubmit={handleEmailChange}>
        <TextInput
          autoComplete="email"
          defaultValue={email}
          description={
            user?.app_metadata.provider === 'email'
              ? intl.formatMessage({
                  defaultMessage:
                    'The email address you want to use to log in.',
                  description: 'Email field description',
                  id: 'DQayC1',
                })
              : intl.formatMessage({
                  defaultMessage:
                    'If you are logged in with OAuth (e.g. GitHub), you can change your email here to use email and password to log in instead.',
                  description: 'Email field description',
                  id: '8ujLk4',
                })
          }
          errorMessage={error || undefined}
          isDisabled={isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Email',
            description: 'Email',
            id: 'y8zzVx',
          })}
          type="email"
          onChange={setEmail}
        />
        {message && (
          <Text color="success" display="block" size="body2">
            {message}
          </Text>
        )}
        <div className="flex justify-end">
          <Button
            isDisabled={email === user?.email || !isValidEmail || isLoading}
            isLoading={isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Save changes',
              description: 'Button label for a form',
              id: 'vSWYET',
            })}
            type="submit"
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
}
