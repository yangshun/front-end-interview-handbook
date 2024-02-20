import { debounce } from 'lodash-es';
import { useEffect, useRef } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

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
    if (usernameExists) {
      setUsernameExistsError(true);
    } else {
      setUsernameExistsError(false);
    }
  }, [usernameExists, setUsernameExistsError]);

  return (
    <TextInput
      // TODO(projects): Replace with correct description for username
      description={intl.formatMessage({
        defaultMessage:
          'Similar to your LinkedIn title. Include your role and company, or your interests.',
        description:
          'Description for "Job Title" input on Projects profile onboarding page',
        id: '7uiIH5',
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
