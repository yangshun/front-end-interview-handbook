import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillTechStackInput from '~/components/projects/skills/ProjectsSkillTechStackInput';

import { getProjectsChallengeSubmissionTechStackAttributes } from './ProjectsChallengeSubmissionTechStackSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'skills';

export default function ProjectsChallengeSubmissionTechStackField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTechStackAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <ProjectsSkillTechStackInput
      description={attrs.description}
      errorMessage={formState.errors[fieldName]?.message}
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
