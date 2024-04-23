import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextArea from '~/components/ui/TextArea';

import { getProjectsProfileBioAttrs } from '../fields/ProjectsProfileBioSchema';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

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
          errorMessage={
            formState.dirtyFields.bio || formState.submitCount > 0
              ? formState.errors.bio?.message
              : undefined
          }
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
