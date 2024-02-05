import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProjectsSkillListInputAttributes } from '~/components/projects/skills/form/ProjectsSkillListInputSchema';
import ProjectsSkillRoadmapSelectionInput from '~/components/projects/skills/form/ProjectsSkillRoadmapSelectionInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
  required?: boolean;
}>;

const fieldName = 'roadmapSkills';

export default function ProjectsChallengeSubmissionRoadmapSkillsField({
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
    <ProjectsSkillRoadmapSelectionInput
      errorMessage={formState.errors[fieldName]?.message}
      required={attrs.validation.required}
      {...field}
    />
  );
}
