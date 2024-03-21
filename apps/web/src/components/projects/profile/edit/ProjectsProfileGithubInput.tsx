import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGithubFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import { getProjectsProfileGitHubAttrs } from '~/components/projects/profile/fields/ProjectsProfileGithubSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileGithubInput({ control }: Props) {
  const intl = useIntl();

  const attrs = getProjectsProfileGitHubAttrs(intl);

  return (
    <Controller
      control={control}
      name="githubUsername"
      render={({ field, formState }) => (
        <TextInput
          description={attrs.description}
          descriptionStyle="tooltip"
          errorMessage={
            formState.dirtyFields.githubUsername || formState.submitCount > 0
              ? formState.errors.githubUsername?.message
              : undefined
          }
          label={attrs.label}
          placeholder={attrs.placeholder}
          startIcon={RiGithubFill}
          {...field}
        />
      )}
    />
  );
}
