import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import { getProjectsTechStackInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
  required?: boolean;
}>;

const fieldName = 'techStackSkills';

export default function ProjectsChallengeSubmissionTechStackField({
  control,
  required,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsTechStackInputAttributes(intl, required);
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillTechStackInput
      description={attrs.description}
      errorMessage={
        dirtyFields[fieldName] || submitCount > 0
          ? errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
