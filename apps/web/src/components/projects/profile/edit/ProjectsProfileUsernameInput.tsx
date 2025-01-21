import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import { getProfileUsernameAttrs } from '~/components/profile/fields/ProfileUsernameSchema';
import type { ProjectsProfileOnboardingStepFormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileForm';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

type Props = Readonly<{
  errorMessage: string | undefined;
  field:
    ControllerRenderProps<ProjectsProfileEditFormValues, 'username'> | ControllerRenderProps<ProjectsProfileOnboardingStepFormValues, 'username'>;
  setUsernameExistsError: (hasError: boolean) => void;
}>;

export default function ProjectsProfileUsernameInput({
  errorMessage,
  field,
  setUsernameExistsError,
}: Props) {
  const intl = useIntl();
  const usernameAttrs = getProfileUsernameAttrs(intl);
  const { data: usernameExists, refetch } =
    trpc.projects.profile.usernameExists.useQuery(
      {
        username: field.value,
      },
      {
        enabled: false,
      },
    );

  const debouncedSearch = useRef(debounce(() => refetch(), 500)).current;

  const onChange = (value: string) => {
    field.onChange(value);
    debouncedSearch();
  };

  useEffect(() => {
    setUsernameExistsError(!!usernameExists);
  }, [usernameExists, setUsernameExistsError]);

  return (
    <TextInput
      autoComplete="off"
      description={intl.formatMessage({
        defaultMessage:
          'Uniquely identifies you. You may be given an option to set a different handle for certain products for anonymity.',
        description:
          'Description for "Username" input on Projects profile onboarding page',
        id: 'pn9hGi',
      })}
      descriptionStyle="tooltip"
      errorMessage={
        usernameExists
          ? intl.formatMessage({
              defaultMessage: 'Username already exists',
              description: 'Error for user already exists',
              id: 'sYQ9YX',
            })
          : errorMessage
      }
      label={usernameAttrs.label}
      maxLength={usernameAttrs.validation.maxLength}
      placeholder={usernameAttrs.placeholder}
      {...field}
      onChange={(value) => onChange(value)}
    />
  );
}
