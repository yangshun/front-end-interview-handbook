import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { useProfileNameSchema } from '~/utils/user/profile';

import { useToast } from '../global/toasts/ToastsProvider';

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

  const nameUpdateMutation = trpc.profile.nameUpdate.useMutation();

  return (
    <Card classNameOuter="self-stretch" disableSpotlight={true} pattern={false}>
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Display name"
          description="Display name"
          id="iIuSTk"
        />
      </Heading>
      <Section>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="This is the name that will be shown on your profile. Use a maximum of 32 characters."
            description="Description of display name field."
            id="tg7jHB"
          />
        </Text>
      </Section>
      <form
        onSubmit={handleSubmit(async (data) => {
          await nameUpdateMutation.mutateAsync(data);
          reset(data);
          toast.showToast({
            title: 'Display name updated',
            variant: 'success',
          });
        })}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              autoComplete="off"
              className="mt-4"
              // TODO: Add default value
              defaultValue={user?.user_metadata?.full_name ?? ''}
              errorMessage={errors.name?.message}
              isDisabled={isLoading}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Display name',
                description: 'Display name',
                id: 'iIuSTk',
              })}
              {...field}
            />
          )}
        />
        <Button
          className="mt-4"
          isDisabled={!isDirty || !isValid}
          isLoading={isLoading}
          label={intl.formatMessage({
            defaultMessage: 'Save Changes',
            description: 'Label for button to save changes to display name',
            id: 'Bqo66a',
          })}
          type="submit"
          variant="primary"
        />
      </form>
    </Card>
  );
}
