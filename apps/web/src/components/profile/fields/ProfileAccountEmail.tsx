import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor } from '~/components/ui/theme';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@supabase/supabase-js';

function useEmailFormSchema(currentEmail: string | undefined) {
  const intl = useIntl();
  const emailFormSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .regex(/^\S+@\S+\.\S+$/, {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a valid email address.',
              description: 'Email validation error message',
              id: 'xK578g',
            }),
          })
          .refine((email) => email !== currentEmail, {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a different email address.',
              description: 'Email validation error message',
              id: 'KZWEcx',
            }),
          }),
      }),
    [currentEmail, intl],
  );

  return emailFormSchema;
}

type EmailFormValues = Readonly<{
  email: string;
}>;

type Props = Readonly<{
  user: User;
}>;

export default function ProfileAccountEmail({ user }: Props) {
  const intl = useIntl();
  const supabaseClient = useSupabaseClientGFE();
  const emailFormSchema = useEmailFormSchema(user?.email ?? '');

  const [message, setMessage] = useState('');

  const { control, setError, formState, handleSubmit } =
    useForm<EmailFormValues>({
      defaultValues: {
        email: user?.email ?? '',
      },
      mode: 'all',
      resolver: zodResolver(emailFormSchema),
    });

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeBorderColor)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          setMessage('');

          const { error: updateError } =
            await supabaseClient.auth.updateUser(data);

          if (updateError) {
            setError('email', {
              message: updateError.message,
            });
          } else {
            setMessage(
              intl.formatMessage({
                defaultMessage:
                  'A confirmation email has been sent to the new email address. The email change will not take effect until the confirmation link in the new email address has been clicked and signing out',
                description:
                  'Message shown after an email change request is successful.',
                id: 'D9oArH',
              }),
            );
          }
        })}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              autoComplete="email"
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
              errorMessage={
                formState.dirtyFields.email || formState.submitCount > 0
                  ? formState.errors.email?.message
                  : undefined
              }
              isDisabled={formState.isSubmitting}
              label={intl.formatMessage({
                defaultMessage: 'Email',
                description: 'Email',
                id: 'y8zzVx',
              })}
              type="email"
              {...field}
            />
          )}
        />
        {message && (
          <Text className="block" color="success" size="body3">
            {message}
          </Text>
        )}
        <div className="flex justify-end">
          <Button
            isDisabled={
              !formState.isDirty || !formState.isValid || formState.isSubmitting
            }
            isLoading={formState.isSubmitting}
            label={intl.formatMessage({
              defaultMessage: 'Save changes',
              description: 'Button label for a form',
              id: 'vSWYET',
            })}
            type="submit"
            variant="secondary"
          />
        </div>
      </form>
    </div>
  );
}
