import clsx from 'clsx';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';
import {
  getProfileNameStrings,
  useProfileNameSchema,
} from '~/hooks/user/profileName';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';

import { themeLineColor } from '../ui/theme';

import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@supabase/supabase-js';

type DisplayNameFormValues = Readonly<{
  name: string;
}>;

function useDisplayNameFormSchema() {
  const profileNameSchema = useProfileNameSchema();

  return useMemo(
    () =>
      z.object({
        name: profileNameSchema,
      }),
    [profileNameSchema],
  );
}

type Props = Readonly<{
  user: User;
}>;

export default function ProfileAccountDisplayName({ user }: Props) {
  const intl = useIntl();
  const profileNameStrings = getProfileNameStrings(intl);

  const toast = useToast();
  const displayNameFormSchema = useDisplayNameFormSchema();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isLoading },
  } = useForm<DisplayNameFormValues>({
    mode: 'all',
    resolver: zodResolver(displayNameFormSchema),
  });

  const profileDataQuery = trpc.profile.getProfile.useQuery();
  const nameUpdateMutation = trpc.profile.nameUpdate.useMutation();

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeLineColor)}>
      <form
        onSubmit={handleSubmit(async (data) => {
          await nameUpdateMutation.mutateAsync(data);
          reset(data);
          toast.showToast({
            title: profileNameStrings.successMessage,
            variant: 'success',
          });
        })}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              autoComplete="off"
              defaultValue={profileDataQuery.data?.name ?? undefined}
              description={profileNameStrings.description}
              errorMessage={errors.name?.message}
              isDisabled={isLoading}
              label={profileNameStrings.label}
              {...field}
            />
          )}
        />
        <div className="flex justify-end">
          <Button
            className="mt-4"
            isDisabled={!isDirty || !isValid}
            isLoading={isLoading}
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
