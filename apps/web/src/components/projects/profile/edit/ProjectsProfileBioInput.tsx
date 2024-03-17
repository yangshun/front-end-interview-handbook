import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextArea from '~/components/ui/TextArea';

import { getProjectsProfileBioAttrs } from '../fields/ProjectsProfileBioSchema';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = {
  control: Control<Values>;
};

export default function ProjectsProfileBioInput({ control }: Props) {
  const intl = useIntl();

  const attrs = getProjectsProfileBioAttrs(intl);

  return (
    <Controller
      control={control}
      name="bio"
      render={({ field, formState }) => (
        <TextArea
          description={attrs.description}
          descriptionStyle="tooltip"
          errorMessage={formState.errors.bio?.message}
          label={attrs.label}
          maxLength={attrs.validation.maxLength}
          placeholder={attrs.placeholder}
          rows={3}
          {...field}
        />
      )}
    />
  );
}
