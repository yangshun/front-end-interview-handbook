import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { getProfileUsernameAttrs } from '~/components/profile/fields/ProfileUsernameSchema';
import type { ProjectsProfileOnboardingStep1FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep1';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

type Props = {
  error: string | undefined;
  field:
    | ControllerRenderProps<
        ProjectsProfileOnboardingStep1FormValues,
        'username'
      >
    | ControllerRenderProps<ProjectsProfileEditFormValues, 'username'>;
  setUsernameExistsError: (hasError: boolean) => void;
};

export default function ProjectsProfileUsernameInput({
  error,
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
          : error
      }
      label={intl.formatMessage({
        defaultMessage: 'Username',
        description:
          'Label for "Username" input on Projects profile onboarding page',
        id: '+Q7wrS',
      })}
      maxLength={usernameAttrs.validation.maxLength}
      minLength={usernameAttrs.validation.minLength}
      placeholder={intl.formatMessage({
        defaultMessage: 'janesmith',
        description:
          'Placeholder for "Username" input on Projects profile onboarding page',
        id: 'sCPBAY',
      })}
      {...field}
      onChange={(value) => onChange(value)}
    />
  );
}
