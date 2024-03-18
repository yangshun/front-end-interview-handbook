import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGlobalLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import { getProjectsProfileWebsiteAttributes } from '~/components/projects/profile/fields/ProjectsProfileWebsiteSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
  showReputationCountIncreaseTag?: boolean;
}>;

export default function ProjectsProfileWebsiteInput({ control }: Props) {
  const intl = useIntl();
  const attrs = getProjectsProfileWebsiteAttributes(intl);

  return (
    <Controller
      control={control}
      name="website"
      render={({ field, formState }) => (
        <TextInput
          description={attrs.description}
          descriptionStyle="tooltip"
          errorMessage={
            formState.dirtyFields.website || formState.submitCount > 0
              ? formState.errors.website?.message
              : undefined
          }
          label={attrs.label}
          placeholder={attrs.placeholder}
          startIcon={RiGlobalLine}
          {...field}
        />
      )}
    />
  );
}
