import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiLinkedinFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import { getProjectsProfileLinkedInAttrs } from '~/components/projects/profile/fields/ProjectsProfileLinkedInSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileLinkedInInput({ control }: Props) {
  const intl = useIntl();
  const attrs = getProjectsProfileLinkedInAttrs(intl);

  return (
    <Controller
      control={control}
      name="linkedInUsername"
      render={({ field, formState }) => (
        <TextInput
          description={attrs.description}
          descriptionStyle="tooltip"
          errorMessage={
            formState.dirtyFields.linkedInUsername || formState.submitCount > 0
              ? formState.errors.linkedInUsername?.message
              : undefined
          }
          label={attrs.label}
          placeholder={attrs.placeholder}
          startIcon={RiLinkedinFill}
          {...field}
        />
      )}
    />
  );
}
