import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';

import { getProjectsChallengeSubmissionTechStackAttributes } from './ProjectsChallengeSubmissionTechStackSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'techStackSkills';

export default function ProjectsChallengeSubmissionTechStackField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTechStackAttributes(intl);
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
