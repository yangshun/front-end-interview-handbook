import clsx from 'clsx';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';
import {
  getProfileUserNameStrings,
  useProfileUserNameSchema,
} from '~/hooks/user/profileUserName';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';
import { themeLineColor } from '~/components/ui/theme';

import { zodResolver } from '@hookform/resolvers/zod';

type UserNameFormValues = Readonly<{
  username: string;
}>;

function useUserNameFormSchema() {
  const userNameSchema = useProfileUserNameSchema();

  return useMemo(
    () =>
      z.object({
        username: userNameSchema,
      }),
    [userNameSchema],
  );
}

export default function ProfileAccountUsername() {
  const intl = useIntl();
  const profileUserNameStrings = getProfileUserNameStrings(intl);

  const toast = useToast();
  const userNameFormSchema = useUserNameFormSchema();
  const { data } = trpc.profile.getProfile.useQuery();
  const userNameUpdateMutation = trpc.profile.userNameUpdate.useMutation();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<UserNameFormValues>({
    defaultValues: {
      username: '',
    },
    mode: 'all',
    resolver: zodResolver(userNameFormSchema),
    values: { username: data?.username ?? '' },
  });

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeLineColor)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (username) => {
          try {
            await userNameUpdateMutation.mutateAsync(username);
          } catch (error: any) {
            setError('username', { message: error.message });

            return;
          }
          reset(username);
          toast.showToast({
            title: profileUserNameStrings.successMessage,
            variant: 'success',
          });
        })}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextInput
              autoComplete="off"
              description={profileUserNameStrings.description}
              errorMessage={errors.username?.message}
              isDisabled={isSubmitting}
              label={profileUserNameStrings.label}
              {...field}
            />
          )}
        />
        <div className="flex justify-end">
          <Button
            isDisabled={!isDirty || !isValid || isSubmitting}
            isLoading={isSubmitting}
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
