import clsx from 'clsx';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import {
  getProfileNameAttrs,
  useProfileNameSchema,
} from '~/components/profile/fields/ProfileNameSchema';
import Button from '~/components/ui/Button';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor } from '~/components/ui/theme';

import { zodResolver } from '@hookform/resolvers/zod';

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

export default function ProfileAccountDisplayName() {
  const intl = useIntl();
  const attrs = getProfileNameAttrs(intl);

  const toast = useToast();
  const displayNameFormSchema = useDisplayNameFormSchema();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<DisplayNameFormValues>({
    mode: 'all',
    resolver: zodResolver(displayNameFormSchema),
  });

  const profileDataQuery = trpc.profile.getProfile.useQuery();
  const nameUpdateMutation = trpc.profile.nameUpdate.useMutation();

  return (
    <div className={clsx('p-4', 'rounded-lg border', themeBorderColor)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(async (data) => {
          await nameUpdateMutation.mutateAsync(data);
          reset(data);
          toast.showToast({
            title: attrs.successMessage,
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
              description={attrs.description}
              errorMessage={errors.name?.message}
              isDisabled={isSubmitting}
              label={attrs.label}
              maxLength={attrs.validation.maxLength}
              placeholder={attrs.placeholder}
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
