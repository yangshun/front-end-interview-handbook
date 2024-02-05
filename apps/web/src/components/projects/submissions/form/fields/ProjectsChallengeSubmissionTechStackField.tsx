import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProjectsSkillListInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
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
  const attrs = getProjectsSkillListInputAttributes(intl, required);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: attrs.validation.required },
  });

  return (
    <ProjectsSkillTechStackInput
      errorMessage={formState.errors[fieldName]?.message}
      required={attrs.validation.required}
      {...field}
    />
  );
}